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
        public class Query : IRequest<Result<PagedList<InstitutionDTO>>>
        {
            public PagingParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<InstitutionDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<InstitutionDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Institutions
                .OrderBy(x => x.Name)
                .ProjectTo<InstitutionDTO>(_mapper.ConfigurationProvider)
                .AsQueryable();
                return Result<PagedList<InstitutionDTO>>.Success(
                    await PagedList<InstitutionDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}