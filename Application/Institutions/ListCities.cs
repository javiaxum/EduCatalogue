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
    public class ListCities
    {
        public class Query : IRequest<Result<List<CityDTO>>>
        {
            public CitiesParams Params { get; set; }
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
                var query = _context.Cities
                .OrderBy(x => x.Name)
                .ProjectTo<CityDTO>(_mapper.ConfigurationProvider)
                .AsQueryable();
                
                if (request.Params.hasInstitutionEntity)
                    query = query.Where(x => x.InstitutionsCount != 0);

                var result = await query.ToListAsync(cancellationToken);

                return Result<List<CityDTO>>.Success(result);
            }
        }
    }
}