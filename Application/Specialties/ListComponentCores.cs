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

namespace Application.Specialties
{
    public class ListComponentCores
    {
        public class Query : IRequest<Result<List<ComponentCoreDTO>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<ComponentCoreDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ComponentCoreDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var componentCores = await _context.ComponentCores
                .ProjectTo<ComponentCoreDTO>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                return Result<List<ComponentCoreDTO>>.Success(componentCores);
            }
        }
    }
}