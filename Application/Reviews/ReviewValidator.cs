using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Reviews
{
    public class ReviewValidator : AbstractValidator<Review>
    {
        public ReviewValidator()
        {
            RuleFor(x => x.Rating).NotEmpty();
            RuleFor(x => x.ReviewMessage).NotEmpty();
        }
    }
}