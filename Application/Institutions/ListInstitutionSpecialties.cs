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
    public class ListInstitutionSpecialties
    {
        public class Query : IRequest<Result<InstitutionDTOSpecialties>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<InstitutionDTOSpecialties>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<InstitutionDTOSpecialties>> Handle(Query request, CancellationToken cancellationToken)
            {
                var specialties = await _context.Institutions
                    .ProjectTo<InstitutionDTOSpecialties>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                    if (specialties == null) return null;
                return Result<InstitutionDTOSpecialties>.Success(specialties);
            }
        }
    }
}