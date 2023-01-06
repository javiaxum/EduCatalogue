using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Institutions
{
    public class InstitutionValidator : AbstractValidator<Institution>
    {
        public InstitutionValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.StreetAddress).NotEmpty();
        }
    }
}