using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class EditInfo
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AppUser User { get; set; }
            public ProfileFormValues FormValues { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // RuleFor(x => x.Institution).SetValidator(new InstitutionValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUsernameAccessor _usernameAccessor;
            public Handler(DataContext context, IMapper mapper, IUsernameAccessor usernameAccessor)
            {
                _usernameAccessor = usernameAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _usernameAccessor.GetUsername());

                _mapper.Map(request.FormValues, user);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("An error has occured while updating the profile");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}