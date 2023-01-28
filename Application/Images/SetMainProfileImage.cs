using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images
{
    public class SetMainProfileImage
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                var user = await _context.Users.Include(i => i.Images).FirstOrDefaultAsync(x => x.UserName == _usernameAccessor.GetUsername());

                if (user == null) return Result<Unit>.Failure("User was not found");

                var image = user.Images.FirstOrDefault(x => x.Id == request.Id);

                if (image == null) return Result<Unit>.Failure("Image was not found");

                var profileMainImage = user.Images.FirstOrDefault(x => x.Type == "ProfileMainImage");

                if (profileMainImage != null) profileMainImage.Type = null;

                image.Type = "ProfileMainImage";

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);
                
                return Result<Unit>.Failure("An error has occured while setting main photo");
            }
        }
    }
}