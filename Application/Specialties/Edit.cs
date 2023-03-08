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
            public SpecialtyComponentsDTO Specialty { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Specialty).SetValidator(new SpecialtyEditValidator());
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
                var specialty = await _context.Specialties.Include(x => x.SpecialtyCore).Include(s => s.Skills).Include(c => c.Components).FirstOrDefaultAsync(x => x.Id == request.Specialty.Id);
                if (specialty == null) return null;

                _mapper.Map(request.Specialty, specialty);
                var specialtyCore = await _context.SpecialtyCores.FirstOrDefaultAsync((x) => x.Id == request.Specialty.LocalSpecialtyCode);
                if (specialtyCore.Id != specialty.SpecialtyCore.Id)
                    specialty.SpecialtyCore = specialtyCore;


                foreach (var skill in specialty.Skills)
                {
                    if (!request.Specialty.SkillIds.Contains(skill.Id)) skill.Specialties.Remove(specialty);
                }

                foreach (var skillId in request.Specialty.SkillIds)
                {
                    var newSkill = await _context.Skills.Include(s => s.Specialties).FirstOrDefaultAsync(x => x.Id == skillId);
                    if (!newSkill.Specialties.Contains(specialty)) newSkill.Specialties.Add(specialty);
                }

                foreach (var componentDTO in request.Specialty.ComponentDTOs)
                {
                    var component = await _context.Components.FindAsync(componentDTO.Id);
                    var newComponent = component == null ? new Component() : component;
                    var componentCore = await _context.ComponentCores.FirstOrDefaultAsync(x => x.Id == componentDTO.ComponentCoreId);
                    newComponent.ComponentCore = componentCore;
                    newComponent.ECTSCredits = componentDTO.ECTSCredits;
                    newComponent.isOptional = componentDTO.isOptional;
                    newComponent.Specialty = specialty;
                    newComponent.Id = componentDTO.Id;
                    if (component == null)
                    {
                        _context.Components.Add(newComponent);
                    }
                }

                var Ids = request.Specialty.ComponentDTOs.Select(x => x.Id).ToList();

                foreach (var component in specialty.Components)
                {
                    if (!Ids.Contains(component.Id))
                    {
                        _context.Remove(component);
                    }
                }

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("An error has occured while updating the specialty");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}