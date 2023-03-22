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
        public class Command : IRequest<Result<ImageDTO>>
        {
            public IFormFile File { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<ImageDTO>>
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

            public async Task<Result<ImageDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(a => a.Avatar)
                    .FirstOrDefaultAsync(x => x.UserName == _usernameAccessor.GetUsername());

                if (user == null) return null;

                var imageUploadResult = await _imageAccessor.AddImage(request.File);

                if (user.Avatar != null)
                {
                    var deleteResult = await _imageAccessor.DeleteImage(user.Avatar.Id);

                    if (deleteResult == null)
                        return Result<ImageDTO>.Failure("An error has occured while saving an image");
                }

                var image = new Image
                {
                    Url = imageUploadResult.Url,
                    Id = imageUploadResult.PublicId,
                };

                user.Avatar = image;

                var imageDTO = new ImageDTO
                {
                    Url = image.Url,
                    Id = image.Id
                };
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<ImageDTO>.Success(imageDTO);

                return Result<ImageDTO>.Failure("An error has occured while saving an image");
            }
        }
    }
}