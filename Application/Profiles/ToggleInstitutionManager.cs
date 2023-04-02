using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ToggleInstitutionManager
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Username { get; set; }
            public Guid InstitutionId { get; set; }
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
                var user = await _context.Users.Include(x => x.Institutions)
                    .FirstOrDefaultAsync(x => x.UserName == request.Username);
                if (user == null)
                    return Result<Unit>.Failure("An error has occured while changing the user");
                var institution = await _context.Institutions.FirstOrDefaultAsync(x => x.Id == request.InstitutionId);
                var appUserInstitution = new AppUserInstitution
                {
                    Institution = institution,
                    Manager = user,
                };
                if (!user.Institutions.Any(i => i.InstitutionId == request.InstitutionId))
                    user.Institutions.Add(appUserInstitution);
                else
                {
                    var appUserInstitutionToRemove = await _context.AppUserInstitution.FirstOrDefaultAsync(x => x.InstitutionId == request.InstitutionId && x.ManagerId == user.Id);
                    _context.AppUserInstitution.Remove(appUserInstitutionToRemove);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("An error has occured while changing the user");
            }
        }
    }
}