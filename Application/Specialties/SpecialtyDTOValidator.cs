using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Specialties
{
    public class SpecialtyDTOValidator : AbstractValidator<SpecialtyDTO>
    {
        public SpecialtyDTOValidator()
        {
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Degree).NotEmpty();
            RuleFor(x => x.EctsCredits).NotEmpty();
            RuleFor(x => x.LocalSpecialtyCode).NotEmpty();
            RuleFor(x => x.PriceUAH).NotEmpty();
        }
    }
}