using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Reviews;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ImageDTO>>>
        {
            public ImageParams Params { get; set; }
            public Guid InstitutionId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<ImageDTO>>>
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

            public async Task<Result<PagedList<ImageDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var institution = await _context.Institutions.FirstOrDefaultAsync(x => x.Id == request.InstitutionId);
                if(institution == null) return null;

                var query = _context.Images
                    .Where(x => x.Institution.Id == request.InstitutionId && x.Id != institution.TitleImageId && x.Id != institution.BackgroundImageId && x.Id != institution.EmblemImageId)
                    .ProjectTo<ImageDTO>(_mapper.ConfigurationProvider);

                return Result<PagedList<ImageDTO>>.Success(
                    await PagedList<ImageDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}