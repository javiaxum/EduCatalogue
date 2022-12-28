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
    public class ListCores
    {
        public class Query : IRequest<Result<List<SpecialtyCoreDTO>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<SpecialtyCoreDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<SpecialtyCoreDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var specialtyCores = await _context.SpecialtyCores
                .ProjectTo<SpecialtyCoreDTO>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                return Result<List<SpecialtyCoreDTO>>.Success(specialtyCores);
            }
        }
    }
}