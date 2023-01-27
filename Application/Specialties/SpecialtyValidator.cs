using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Specialties;
using Domain;
using FluentValidation;

namespace Application.Specialties
{
    public class SpecialtyValidator : AbstractValidator<SpecialtyDTO>
    {
        public SpecialtyValidator()
        {
            RuleFor(x => x.Degree).NotEmpty();
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