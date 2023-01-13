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

namespace Application.Specialties
{
    public class Details
    {
        public class Query : IRequest<Result<SpecialtyComponentsDTO>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<SpecialtyComponentsDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<SpecialtyComponentsDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var specialty = await _context.Specialties
                    .ProjectTo<SpecialtyComponentsDTO>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                    if (specialty == null) return null;
                    
                return Result<SpecialtyComponentsDTO>.Success(specialty);
            }
        }

    }
}