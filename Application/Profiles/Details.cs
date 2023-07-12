using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Reviews;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<ProfileDetailed>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<ProfileDetailed>>
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

            public async Task<Result<ProfileDetailed>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.ProjectTo<ProfileDetailed>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Username == _usernameAccessor.GetUsername());

                if (user == null) return null;
                
                var institutionIds = user.ManagedInstitutions.Select(x => x.Id).ToList();

                var nonApprovedInstitutions = await _context.Institutions
                    .Where(i => institutionIds.Contains(i.Id)
                        && (i.Approved == false)).ToListAsync();
                var nonApprovedSpecialties = await _context.Specialties.Include(s => s.Institution).Include(s => s.SpecialtyCore)
                    .Where(s => s.Approved == false
                        && institutionIds.Contains(s.Institution.Id)).ToListAsync();

                foreach (var review in user.Reviews)
                {
                    var institution = await _context.Institutions.FirstOrDefaultAsync(x => x.Id == review.InstitutionId);
                    if (institution != null && institution.TitleImageId != null)
                    {
                        var image = await _context.Images.FirstOrDefaultAsync(x => x.Id == institution.TitleImageId);
                        if (image != null)
                            review.TitleImageUrl = image.Url;
                    }
                }

                user.PendingChanges = new List<PendingChange>();
                foreach (var i in nonApprovedInstitutions)
                {
                    if (i.TitleImageId != null)
                    {
                        var image = await _context.Images.FirstOrDefaultAsync(x => x.Id == i.TitleImageId);
                        if (image != null)
                            user.PendingChanges.Add(
                                new PendingChange
                                {
                                    Id = i.Id,
                                    Name = i.Name,
                                    TitleImageUrl = image.Url,
                                }
                            );
                    }
                }
                foreach (var item in nonApprovedSpecialties)
                {
                    var image = await _context.Images.FirstOrDefaultAsync(x => x.Id == item.Institution.TitleImageId);
                    if (image != null)
                        user.PendingChanges.Add(
                            new PendingChange
                            {
                                Id = item.Id,
                                Name = item.SpecialtyCore.Id.ToString() + ' ' + item.SpecialtyCore.Name,
                                InstitutionName = item.Institution.Name,
                                TitleImageUrl = image.Url,
                            }
                        );
                }
                return Result<ProfileDetailed>.Success(user);
            }
        }
    }
}