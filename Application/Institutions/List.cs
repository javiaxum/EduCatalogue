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
    public class List
    {
        public class Query : IRequest<Result<List<InstitutionDTO>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<InstitutionDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<InstitutionDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var institutions = await _context.Institutions
                .ProjectTo<InstitutionDTO>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                return Result<List<InstitutionDTO>>.Success(institutions);
            }
        }
    }
}