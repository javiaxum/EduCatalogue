using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Institutions
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var institution = await _context.Institutions.Include(x => x.Languages).Include(x => x.StudyForms).FirstOrDefaultAsync(x => x.Id == request.Institution.Id);
                if (institution == null) return null;

                _mapper.Map(request.Institution, institution);
                institution.Approved = false;
                institution.City = await _context.Cities.FirstOrDefaultAsync(x => x.Id == request.Institution.CityId);
                foreach (var language in institution.Languages)
                    if (!request.Institution.LanguageIds.Contains(language.Id)) language.Institutions.Remove(institution);

                foreach (var languageId in request.Institution.LanguageIds)
                {
                    var newLanguage = await _context.Languages.Include(s => s.Institutions).FirstOrDefaultAsync(x => x.Id == languageId);
                    if (!newLanguage.Institutions.Contains(institution)) newLanguage.Institutions.Add(institution);
                }

                foreach (var studyForm in institution.StudyForms)
                    if (!request.Institution.StudyFormIds.Contains(studyForm.Id)) studyForm.Institutions.Remove(institution);

                foreach (var studyFormId in request.Institution.StudyFormIds)
                {
                    var newStudyForm = await _context.StudyForms.Include(s => s.Institutions).FirstOrDefaultAsync(x => x.Id == studyFormId);
                    if (!newStudyForm.Institutions.Contains(institution)) newStudyForm.Institutions.Add(institution);
                }

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("An error has occured while updating an institution");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}