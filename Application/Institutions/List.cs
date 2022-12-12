using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Institutions
{
    public class List
    {
        public class Query : IRequest<Result<List<Institution>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<Institution>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Institution>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Institution>>.Success(await _context.Institutions.ToListAsync(cancellationToken));
            }
        }
    }
}