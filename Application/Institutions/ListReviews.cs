using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Application.Core;
using Application.Reviews;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Institutions
{
    public class ListReviews
    {
        public class Query : IRequest<Result<PagedList<ReviewDTO>>>
        {
            public ReviewParams Params { get; set; }
            public Guid InstitutionId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<ReviewDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<ReviewDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var IsTargetRating = int.TryParse(request.Params.TargetRating, out int TargetRating);

                var institution = await _context.Institutions
                    .Include(s => s.Reviews)
                        .ThenInclude(x => x.Author)
                    .FirstOrDefaultAsync(x => x.Id == request.InstitutionId);
                var query = institution.Reviews.AsQueryable().Where(r =>
                       (!IsTargetRating || r.Rating == TargetRating));
                var sortedQuery =
                    request.Params.Sorting == "lrf"
                    ? query.OrderBy(x => x.Rating)
                    : request.Params.Sorting == "hrf"
                    ? query.OrderByDescending(x => x.Rating)
                    : query.OrderBy(x => x.CreatedAt);
                var result = sortedQuery
                .ProjectTo<ReviewDTO>(_mapper.ConfigurationProvider);
                return Result<PagedList<ReviewDTO>>.Success(
                    PagedList<ReviewDTO>.Create(result, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}