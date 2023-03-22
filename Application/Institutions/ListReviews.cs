using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
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
            private readonly IUsernameAccessor _usernameAccessor;

            public Handler(DataContext context, IMapper mapper, IUsernameAccessor usernameAccessor)
            {
                _usernameAccessor = usernameAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<ReviewDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var IsTargetRating = int.TryParse(request.Params.TargetRating, out int TargetRating);

                var query = _context.Reviews.Where(x => x.Institution.Id == request.InstitutionId)
                .Where(r => (!IsTargetRating || r.Rating == TargetRating || r.Author.UserName ==  _usernameAccessor.GetUsername()));
                var result = query
                   .ProjectTo<ReviewDTO>(_mapper.ConfigurationProvider)
                   .OrderByDescending(r => r.Author.Username ==  _usernameAccessor.GetUsername());
                var sortedResult =
                    request.Params.Sorting == "lrf"
                    ? result.ThenBy(x => x.Rating)
                    : request.Params.Sorting == "hrf"
                    ? result.ThenByDescending(x => x.Rating)
                    : result.ThenByDescending(x => x.CreatedAt);

                return Result<PagedList<ReviewDTO>>.Success(
                    await PagedList<ReviewDTO>.CreateAsync(sortedResult, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}