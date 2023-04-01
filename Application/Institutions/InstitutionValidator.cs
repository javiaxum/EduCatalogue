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
            RuleFor(x => x.Visible).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Accreditation).NotEmpty();
            RuleFor(x => x.TypeId).NotEmpty();
            RuleFor(x => x.CityId).NotEmpty();
            RuleFor(x => x.RegionId).NotEmpty();
            RuleFor(x => x.Latitude).NotEmpty();
            RuleFor(x => x.Longtitude).NotEmpty();
            RuleFor(x => x.StreetAddress).NotEmpty();
        }
    }
}