using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Specialties;
using Domain;
using FluentValidation;

namespace Application.Specialties
{
    public class SpecialtyEditValidator : AbstractValidator<SpecialtyDTO>
    {
        public SpecialtyEditValidator()
        {
            RuleFor(x => x.DegreeId).NotEmpty();
            RuleFor(x => x.EndYear).NotEmpty();
            RuleFor(x => x.StartYear).NotEmpty();
            RuleFor(x => x.LocalSpecialtyCode).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.EctsCredits).NotEmpty();
            RuleFor(x => x.LocalSpecialtyCode).NotEmpty();
            RuleFor(x => x.PriceUAH).NotEmpty();
        }
    }
}