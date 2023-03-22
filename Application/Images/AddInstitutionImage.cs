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
    public class AddInstitutionImage
    {
        public class Command : IRequest<Result<ImageDTO>>
        {
            public IFormFile File { get; set; }
            public ImageParams Params { get; set; }
            public Guid Id { get; set; }
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
                var institution = await _context.Institutions
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (institution == null) return null;

                string deleteResult = "";
                if (!String.IsNullOrEmpty(institution.TitleImageId) && request.Params.isTitleImage)
                    try
                    {
                        deleteResult = await _imageAccessor.DeleteImage(institution.TitleImageId);
                    }
                    catch (System.Exception)
                    {
                        deleteResult = "Ok";
                    }

                if (!String.IsNullOrEmpty(institution.BackgroundImageId) && request.Params.isBackgroundImage)
                    try
                    {
                        deleteResult = await _imageAccessor.DeleteImage(institution.BackgroundImageId);
                    }
                    catch (System.Exception)
                    {
                        deleteResult = "Ok";
                    }

                if (deleteResult == null)
                    return Result<ImageDTO>.Failure("An error has occured while deleting an image");

                var imageUploadResult = await _imageAccessor.AddImage(request.File);

                var image = new Image
                {
                    Url = imageUploadResult.Url,
                    Id = imageUploadResult.PublicId,
                };

                if (request.Params.isTitleImage)
                    institution.TitleImageId = image.Id;
                else if (request.Params.isBackgroundImage)
                    institution.BackgroundImageId = image.Id;
                institution.Images.Add(image);

                var result = await _context.SaveChangesAsync() > 0;
                var imageDTO = new ImageDTO
                {
                    Url = image.Url,
                    Id = image.Id
                };
                if (result) return Result<ImageDTO>.Success(imageDTO);

                return Result<ImageDTO>.Failure("An error has occured while deleting an image");
            }
        }
    }
}