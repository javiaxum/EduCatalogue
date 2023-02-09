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
                var IsSpecialtiesPredicate = !String.IsNullOrEmpty(request.Params.SpecialtiesPredicate);
                var IsBranchesPredicate = !String.IsNullOrEmpty(request.Params.BranchesPredicate);
                if (IsSpecialtiesPredicate) IsBranchesPredicate = false;
                var IsCitiesPredicate = !String.IsNullOrEmpty(request.Params.CitiesPredicate);
                var IsMaxPrice = int.TryParse(request.Params.MaxPrice, out int MaxPrice);
                var IsMinPrice = int.TryParse(request.Params.MinPrice, out int MinPrice);
                var IsDegree = !String.IsNullOrEmpty(request.Params.Degree);

                string[] CitiesPredicate;
                if (IsCitiesPredicate)
                    CitiesPredicate = request.Params.CitiesPredicate.Split('-');
                else 
                    CitiesPredicate = new string[0];

                var query = _context.Institutions.Where(x =>
                    (!IsCitiesPredicate || CitiesPredicate.Contains(x.City.Id.ToString()))
                    && x.Specialties.Any(s =>
                        (!IsSpecialtiesPredicate || request.Params.SpecialtiesPredicate.Contains(s.SpecialtyCore.Id))
                        && (!IsBranchesPredicate || request.Params.BranchesPredicate.Contains(s.SpecialtyCore.Id.Substring(0, 2)))
                        && (!IsMaxPrice || s.PriceUAH <= MaxPrice)
                        && (!IsMinPrice || s.PriceUAH >= MinPrice)
                        && (!IsDegree || s.Degree ==  request.Params.Degree)));

                var result = query.OrderBy(x => x.Name)
                .ProjectTo<InstitutionDTO>(_mapper.ConfigurationProvider);
                return Result<PagedList<InstitutionDTO>>.Success(
                    await PagedList<InstitutionDTO>.CreateAsync(result, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}