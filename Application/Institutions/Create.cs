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

namespace Application.Institutions
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Institution Institution { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Institution).SetValidator(new InstitutionValidator());
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

                var manager = new AppUserInstitution
                {
                    Manager = user,
                    Institution = request.Institution,
                };
                
                request.Institution.Managers.Add(manager);

                _context.Institutions.Add(request.Institution);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("An error has occured while creating an institution");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}