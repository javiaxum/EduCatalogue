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

namespace Application.Specialties
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SpecialtyFormValues Specialty { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Specialty).SetValidator(new SpecialtyFormValuesValidator());
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
                var institution = await _context.Institutions.FirstOrDefaultAsync(x => x.Id == request.Specialty.InstitutionId);
                var specialtyCore = await _context.SpecialtyCores.FirstOrDefaultAsync(x => x.LICore.Id == request.Specialty.LocalSpecialtyCode);
                var specialty = new Specialty
                {
                    SpecialtyCore = specialtyCore,
                    Description = request.Specialty.Description,
                    EctsCredits = request.Specialty.EctsCredits,
                    Degree = request.Specialty.Degree
                };
                var institutionSpecialty = new InstitutionSpecialty
                {
                    Institution = institution,
                    Specialty = specialty
                };
                specialty.Institutions.Add(institutionSpecialty);

                _context.Specialties.Add(specialty);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("An error has occured while creating a specialty");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}