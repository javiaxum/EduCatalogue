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
                        var titleImage = await _context.Images.FirstOrDefaultAsync(x => x.Id == institution.TitleImageId);
                        if (titleImage != null)
                            _context.Images.Remove(titleImage);
                    }
                    catch (System.Exception)
                    {
                        deleteResult = "Ok";
                    }

                if (!String.IsNullOrEmpty(institution.BackgroundImageId) && request.Params.isBackgroundImage)
                    try
                    {
                        deleteResult = await _imageAccessor.DeleteImage(institution.BackgroundImageId);
                        var backgroundImage = await _context.Images.FirstOrDefaultAsync(x => x.Id == institution.BackgroundImageId);
                        if (backgroundImage != null)
                            _context.Images.Remove(backgroundImage);
                    }
                    catch (System.Exception)
                    {
                        deleteResult = "Ok";
                    }

                if (!String.IsNullOrEmpty(institution.EmblemImageId) && request.Params.isEmblemImage)
                    try
                    {
                        deleteResult = await _imageAccessor.DeleteImage(institution.EmblemImageId);
                        var emblemImage = await _context.Images.FirstOrDefaultAsync(x => x.Id == institution.EmblemImageId);
                        if (emblemImage != null)
                            _context.Images.Remove(emblemImage);
                    }
                    catch (System.Exception)
                    {
                        deleteResult = "Ok";
                    }

                if (deleteResult == null)
                    return Result<ImageDTO>.Failure("An error has occured while deleting an image");

                var imageUploadResult = await _imageAccessor.AddImage(request.File);
                if (imageUploadResult == null)
                    return Result<ImageDTO>.Failure("An error has occured while uploading an image");

                var image = new Image
                {
                    Url = imageUploadResult.Url,
                    Id = imageUploadResult.PublicId,
                };

                if (request.Params.isTitleImage)
                    institution.TitleImageId = image.Id;
                else if (request.Params.isBackgroundImage)
                    institution.BackgroundImageId = image.Id;
                else if (request.Params.isEmblemImage)
                    institution.EmblemImageId = image.Id;
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