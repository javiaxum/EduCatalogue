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

namespace Application.Specialties
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SpecialtyDTO Specialty { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Specialty).SetValidator(new SpecialtyValidator());
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
                var specialty = await _context.Specialties.Include(x => x.SpecialtyCore).FirstOrDefaultAsync(x => x.Id == request.Specialty.Id);
                if (specialty == null) return null;

                _mapper.Map(request.Specialty, specialty);
                var specialtyCore = await _context.SpecialtyCores.FirstOrDefaultAsync((x) => x.Id == request.Specialty.LocalSpecialtyCode);
                
                if (specialtyCore.Id != specialty.SpecialtyCore.Id)
                    specialty.SpecialtyCore = specialtyCore;

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("An error has occured while updating an institution");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}