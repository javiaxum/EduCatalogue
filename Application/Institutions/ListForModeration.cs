using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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
    public class ListForModeration
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
                var IsCitiesPredicate = !String.IsNullOrEmpty(request.Params.CitiesPredicate);
                var IsName = !String.IsNullOrEmpty(request.Params.Name);
                var CitiesPredicate = IsCitiesPredicate ? request.Params.CitiesPredicate.Split('-') : new string[0];

                var query = _context.Institutions.Include(s => s.Specialties).Where(x =>
                    x.Approved == false
                    && (!IsCitiesPredicate || CitiesPredicate.Contains(x.City.Id.ToString()))
                    && (!IsName || x.Name.ToLower().Contains(request.Params.Name.ToLower())));

                var sortedQuery =
                    request.Params.Sorting == "za"
                    ? query.OrderByDescending(x => x.Name)
                    : request.Params.Sorting == "hr"
                    ? query.OrderByDescending(x => x.Reviews.Select(x => x.Rating).Average())
                    : query.OrderBy(x => x.Name);
                var result = sortedQuery
                .ProjectTo<InstitutionDTO>(_mapper.ConfigurationProvider);
                return Result<PagedList<InstitutionDTO>>.Success(
                    await PagedList<InstitutionDTO>.CreateAsync(result, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}