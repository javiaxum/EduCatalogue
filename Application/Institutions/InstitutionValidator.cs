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
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.StudentCount).NotEmpty();
            RuleFor(x => x.CityId).NotEmpty();
            RuleFor(x => x.StreetAddress).NotEmpty();
            RuleFor(x => x.ContactInformation).NotEmpty();
        }
    }
}