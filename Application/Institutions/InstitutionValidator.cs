using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Institutions
{
    public class InstitutionValidator : AbstractValidator<InstitutionDTO>
    {
        public InstitutionValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}