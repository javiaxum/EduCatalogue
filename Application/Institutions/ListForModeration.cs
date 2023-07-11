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
                // var IsSpecialtiesPredicate = !String.IsNullOrEmpty(request.Params.SpecialtiesPredicate);
                // var IsBranchesPredicate = IsSpecialtiesPredicate ? false : !String.IsNullOrEmpty(request.Params.BranchesPredicate);
                var IsCitiesPredicate = !String.IsNullOrEmpty(request.Params.CitiesPredicate);
                // var IsMaxTuition = int.TryParse(request.Params.MaxTuition, out int MaxTuition);
                // var IsMinTuition = int.TryParse(request.Params.MinTuition, out int MinTuition);
                var IsDegree = int.TryParse(request.Params.DegreeId, out int Degree);
                var IsName = !String.IsNullOrEmpty(request.Params.Name);
                var CitiesPredicate = IsCitiesPredicate ? request.Params.CitiesPredicate.Split('-') : new string[0];

                var query = _context.Institutions.Include(s => s.Specialties).Where(x =>
                    x.Approved == false
                    && (!IsCitiesPredicate || CitiesPredicate.Contains(x.City.Id.ToString()))
                    && (!IsName || x.Name.ToLower().Contains(request.Params.Name.ToLower()))
                    // && x.Specialties.Any(s =>
                    //     (!IsSpecialtiesPredicate || request.Params.SpecialtiesPredicate.Contains(s.SpecialtyCore.Id))
                    //     && (!IsBranchesPredicate || request.Params.BranchesPredicate.Contains(s.SpecialtyCore.Id.Substring(0, 2)))
                        // && (!IsMaxTuition || s.TuitionUSD <= MaxTuition)
                        // && (!IsMinTuition || s.TuitionUSD >= MinTuition)
                        // && (!IsDegree || s.Degree.Id == Degree))
                        );

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