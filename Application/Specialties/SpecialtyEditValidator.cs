using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Specialties;
using Domain;
using FluentValidation;

namespace Application.Specialties
{
    public class SpecialtyEditValidator : AbstractValidator<SpecialtyDetailedDTO>
    {
        public SpecialtyEditValidator()
        {
            RuleFor(x => x.LocalSpecialtyCode).NotEmpty();
            RuleFor(x => x.Visible).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.DegreeId).NotEmpty();
            RuleFor(x => x.TuitionUAH).NotEmpty();
            RuleFor(x => x.AcceptanceRate).NotEmpty();
            RuleFor(x => x.GraduationRate).NotEmpty();
            RuleFor(x => x.UndergraduatesEnrolled).NotEmpty();
            RuleFor(x => x.EctsCredits).NotEmpty();
            RuleFor(x => x.StartYear).NotEmpty();
            RuleFor(x => x.EndYear).NotEmpty();
            RuleFor(x => x.StudyFormIds).NotEmpty();
            RuleFor(x => x.LanguageIds).NotEmpty();
            RuleFor(x => x.SkillIds).NotEmpty();
            RuleFor(x => x.ComponentDTOs).NotEmpty();
        }
    }
}