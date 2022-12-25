using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Specialties
{
    public class SpecialtyFormValuesValidator : AbstractValidator<SpecialtyFormValues>
    {
        public SpecialtyFormValuesValidator()
        {
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Degree).NotEmpty();
            RuleFor(x => x.EctsCredits).NotEmpty();
        }
    }
}