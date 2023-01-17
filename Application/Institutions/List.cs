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
            public InstitutionParams Params { get; set; }
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
                if (!String.IsNullOrEmpty(request.Params.BranchesPredicate))
                {
                    query = query.Where(x => x.Specialties.Any(s => request.Params.BranchesPredicate.Contains(s.LocalSpecialtyCode.Substring(0, 2))));
                }
                if (!String.IsNullOrEmpty(request.Params.SpecialtiesPredicate))
                {
                    query = query.Where(x => x.Specialties.Any(s => request.Params.SpecialtiesPredicate.Contains(s.LocalSpecialtyCode.Substring(0, 2))));
                }
                if (!String.IsNullOrEmpty(request.Params.CitiesPredicate))
                {
                    query = query.Where(x => request.Params.CitiesPredicate.Contains(x.City));
                }
                if (!String.IsNullOrEmpty(request.Params.MinPrice))
                {
                    int minParseresult;
                    if(int.TryParse(request.Params.MinPrice, out minParseresult))
                    query = query.Where(x => x.Specialties.Any(s => s.PriceUAH >= minParseresult));
                }
                if (!String.IsNullOrEmpty(request.Params.MaxPrice))
                {
                    int maxParseresult;
                    if(int.TryParse(request.Params.MaxPrice, out maxParseresult))
                    query = query.Where(x => x.Specialties.Any(s => s.PriceUAH <= maxParseresult));
                }
                return Result<PagedList<InstitutionDTO>>.Success(
                    await PagedList<InstitutionDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}