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
                .AsQueryable();
                if (!String.IsNullOrEmpty(request.Params.BranchesPredicate))
                {
                    query = query.Where(x => x.Specialties.Any(s => request.Params.BranchesPredicate.Contains(s.SpecialtyCore.Id.Substring(0, 2))));
                }
                if (!String.IsNullOrEmpty(request.Params.SpecialtiesPredicate))
                {
                    query = query.Where(x => x.Specialties.Any(s => request.Params.SpecialtiesPredicate.Contains(s.SpecialtyCore.Id)));
                }
                if (!String.IsNullOrEmpty(request.Params.CitiesPredicate))
                {
                    query = query.Where(x => request.Params.CitiesPredicate.Contains(x.City.Name));
                }
                if (!String.IsNullOrEmpty(request.Params.MinPrice))
                {
                    int minParseResult;
                    if (int.TryParse(request.Params.MinPrice, out minParseResult))
                        query = query.Where(x => x.Specialties.Any(s => s.PriceUAH >= minParseResult));
                }
                if (!String.IsNullOrEmpty(request.Params.MaxPrice))
                {
                    int maxParseResult;
                    if (int.TryParse(request.Params.MaxPrice, out maxParseResult))
                        query = query.Where(x => x.Specialties.Any(s => s.PriceUAH <= maxParseResult));
                }
                var result = query.OrderBy(x => x.Name)
                .ProjectTo<InstitutionDTO>(_mapper.ConfigurationProvider);
                return Result<PagedList<InstitutionDTO>>.Success(
                    await PagedList<InstitutionDTO>.CreateAsync(result, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}