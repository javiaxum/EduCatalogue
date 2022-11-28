using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Institutions
{
    public class List
    {
        public class Query : IRequest<List<Institution>>
        {

        }
        public class Handler : IRequestHandler<Query, List<Institution>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Institution>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Institutions.ToListAsync();
            }
        }
    }
}