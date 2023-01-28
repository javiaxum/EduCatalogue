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

namespace Application.Images
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUsernameAccessor _usernameAccessor;
            private readonly IImageAccessor _imageAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IImageAccessor imageAccessor, IUsernameAccessor usernameAccessor)
            {
                _context = context;
                _imageAccessor = imageAccessor;
                _usernameAccessor = usernameAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(i => i.Images)
                    .FirstOrDefaultAsync(x => x.UserName == _usernameAccessor.GetUsername());

                if (user == null) return null;

                var image = user.Images.FirstOrDefault(x => x.Id == request.Id);

                if (image == null) return null;

                if (image.Type == "ProfileMainImage") return Result<Unit>.Failure("Main profile photo cannot be deleted");

                var imageDeleteResult = await _imageAccessor.DeleteImage(image.Id);

                if (imageDeleteResult == null) return Result<Unit>.Failure("An error has occured while deleting an image from Cloudinary");

                user.Images.Remove(image);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("An error has occured while deleting an image from API");
            }
        }
    }
}