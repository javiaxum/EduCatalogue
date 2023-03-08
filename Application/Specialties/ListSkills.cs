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
    public class ListSkills
    {
        public class Query : IRequest<Result<List<SkillDTO>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<SkillDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<SkillDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var branches = await _context.Skills
                .ProjectTo<SkillDTO>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                return Result<List<SkillDTO>>.Success(branches);
            }
        }
    }
}