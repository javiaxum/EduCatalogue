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
            public Guid Id { get; set; }
            public SpecialtyDetailedDTO Specialty { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Specialty).SetValidator(new SpecialtyCreateValidator());
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
                var institution = await _context.Institutions.FirstOrDefaultAsync(x => x.Id == request.Id);
                var specialtyCore = await _context.SpecialtyCores.FirstOrDefaultAsync(x => x.Id == request.Specialty.LocalSpecialtyCode);
                var specialty = new Specialty();
                _mapper.Map(request.Specialty, specialty);
                specialty.Institution = institution;
                specialty.SpecialtyCore = specialtyCore;

                var degree = await _context.Degrees.FindAsync(request.Specialty.DegreeId);
                if (degree != null)
                    specialty.Degree = degree;

                foreach (var skillId in request.Specialty.SkillIds)
                {
                    var newSkill = await _context.Skills.Include(s => s.Specialties).FirstOrDefaultAsync(x => x.Id == skillId);
                    newSkill.Specialties.Add(specialty);
                }

                foreach (var languageId in request.Specialty.LanguageIds)
                {
                    var newLanguage = await _context.Languages.Include(s => s.Specialties).FirstOrDefaultAsync(x => x.Id == languageId);
                    newLanguage.Specialties.Add(specialty);
                }

                foreach (var studyFormId in request.Specialty.StudyFormIds)
                {
                    var newStudyForm = await _context.StudyForms.Include(s => s.Specialties).FirstOrDefaultAsync(x => x.Id == studyFormId);
                    newStudyForm.Specialties.Add(specialty);
                }

                foreach (var componentDTO in request.Specialty.ComponentDTOs)
                {
                    var newComponent = new Component();
                    var componentCore = await _context.ComponentCores.FirstOrDefaultAsync(x => x.Id == componentDTO.ComponentCoreId);
                    newComponent.ComponentCore = componentCore;
                    newComponent.ECTSCredits = componentDTO.ECTSCredits;
                    newComponent.isOptional = componentDTO.isOptional;
                    newComponent.Specialty = specialty;
                    newComponent.Id = componentDTO.Id;
                    _context.Components.Add(newComponent);
                }
                specialty.Approved = false;
                specialty.Visible = false;
                _context.Specialties.Add(specialty);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("An error has occured while creating a specialty");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}