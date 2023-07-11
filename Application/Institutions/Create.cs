using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Institutions
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public InstitutionDTO Institution { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Institution).SetValidator(new InstitutionValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUsernameAccessor _usernameAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUsernameAccessor usernameAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _usernameAccessor = usernameAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _usernameAccessor.GetUsername());
                var newInstitution = new Institution();
                _mapper.Map(request.Institution, newInstitution);
                newInstitution.City = await _context.Cities.FirstOrDefaultAsync(x => x.Id == request.Institution.CityId);

                newInstitution.Languages = new List<Language>();
                foreach (var languageId in request.Institution.LanguageIds)
                {
                    var language = await _context.Languages.FirstOrDefaultAsync(x => x.Id == languageId);
                    newInstitution.Languages.Add(language);
                }

                newInstitution.StudyForms = new List<StudyForm>();
                foreach (var studyFormId in request.Institution.StudyFormIds)
                {
                    var studyForm = await _context.StudyForms.FirstOrDefaultAsync(x => x.Id == studyFormId);
                    newInstitution.StudyForms.Add(studyForm);
                }
                
                newInstitution.Visible = false;
                newInstitution.Approved = false;
                newInstitution.ReviewsCount = 0;
                newInstitution.Rating = 0;
                _context.Institutions.Add(newInstitution);

                var manager = new AppUserInstitution
                {
                    Manager = user,
                    Institution = newInstitution,
                };

                newInstitution.Managers.Add(manager);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("An error has occured while creating an institution");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}