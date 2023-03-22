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
    public class SetStatus
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
            public Guid InstitutionId { get; set; }
            public ImageParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var image = await _context.Images.FirstOrDefaultAsync(x => x.Id == request.Id);
                var institution = await _context.Institutions.FirstOrDefaultAsync(x => x.Id == request.InstitutionId);

                if (request.Params.isTitleImage && institution.TitleImageId != image.Id)
                    institution.TitleImageId = image.Id;
                else if (request.Params.isBackgroundImage && institution.BackgroundImageId != image.Id)
                    institution.BackgroundImageId = image.Id;
                else if (request.Params.isEmblemImage && institution.EmblemImageId != image.Id)
                    institution.EmblemImageId = image.Id;
                else if (!request.Params.isBackgroundImage && !request.Params.isTitleImage && !request.Params.isEmblemImage)
                {
                    if (institution.TitleImageId == image.Id)
                        institution.TitleImageId = null;
                    if (institution.BackgroundImageId == image.Id)
                        institution.BackgroundImageId = null;
                    if (institution.EmblemImageId == image.Id)
                        institution.EmblemImageId = null;
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("An error has occured while changing an image");
            }
        }
    }
}