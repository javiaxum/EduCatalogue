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
            
        }
    }
}