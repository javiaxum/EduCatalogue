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
    public class DeleteInstitutionImage
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid InstitutionId { get; set; }
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
                var image = await _context.Images.FirstOrDefaultAsync(x => x.Id == request.Id);
                var institution = await _context.Institutions.FirstOrDefaultAsync(x => x.Id == request.InstitutionId);

                var imageDeleteResult = await _imageAccessor.DeleteImage(image.Id);

                if (imageDeleteResult == null) return Result<Unit>.Failure("An error has occured while deleting an image from Cloudinary");

                if (institution.TitleImageId == image.Id)
                    institution.TitleImageId = null;
                if (institution.BackgroundImageId == image.Id)
                    institution.BackgroundImageId = null;
                if (institution.EmblemImageId == image.Id)
                    institution.EmblemImageId = null;
                institution.Images.Remove(image);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("An error has occured while deleting an image");
            }
        }
    }
}