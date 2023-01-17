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
    public class ListCities // List all cities containing at least a single university added to this site
    {
        public class Query : IRequest<Result<List<CityDTO>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<CityDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<CityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var cities = await _context.Cities
                .OrderBy(x => x.Name)
                .ProjectTo<CityDTO>(_mapper.ConfigurationProvider)
                .Where(x => x.InstitutionsCount != 0)
                .ToListAsync(cancellationToken);

                return Result<List<CityDTO>>.Success(cities);
            }
        }
    }
}