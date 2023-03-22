using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Specialties
{
    public class SpecialtyCreateValidator : AbstractValidator<SpecialtyDetailedDTO>
    {
        public SpecialtyCreateValidator()
        {
            RuleFor(x => x.DegreeId).NotEmpty();
        }
    }
}