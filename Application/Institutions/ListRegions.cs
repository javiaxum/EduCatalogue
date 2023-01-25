using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Institutions
{
    public class ListRegions
    {
        public class Query : IRequest<Result<List<RegionDTO>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<RegionDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<RegionDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var regions = await _context.Regions
                .OrderBy(x => x.Name)
                .ProjectTo<RegionDTO>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                
                return Result<List<RegionDTO>>.Success(regions);
            }
        }
    }
}