using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public Review Review { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Review).SetValidator(new ReviewValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUsernameAccessor _usernameAccessor;
            public Handler(DataContext context, IUsernameAccessor usernameAccessor)
            {
                _usernameAccessor = usernameAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _usernameAccessor.GetUsername());
                var institution = await _context.Institutions.FirstOrDefaultAsync(x => x.Id == request.Id);
                request.Review.Author = user;
                request.Review.Institution = institution;

                _context.Reviews.Add(request.Review);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("An error has occured while creating a review");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}