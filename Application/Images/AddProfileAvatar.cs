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
    public class AddProfileAvatar
    {
        public class Command : IRequest<Result<Image>>
        {
            public IFormFile File { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Image>>
        {
            private readonly DataContext _context;
            private readonly IUsernameAccessor _usernameAccessor;
            private readonly IImageAccessor _imageAccessor;
            public Handler(DataContext context, IImageAccessor imageAccessor, IUsernameAccessor usernameAccessor)
            {
                _imageAccessor = imageAccessor;
                _usernameAccessor = usernameAccessor;
                _context = context;
            }

            public async Task<Result<Image>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _usernameAccessor.GetUsername());

                if (user == null) return null;

                var imageUploadResult = await _imageAccessor.AddImage(request.File);

                var image = new Image
                {
                    Url = imageUploadResult.Url,
                    Id = imageUploadResult.PublicId,
                };

                user.Avatar = image;

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Image>.Success(image);

                return Result<Image>.Failure("An error has occured while saving an image");
            }
        }
    }
}