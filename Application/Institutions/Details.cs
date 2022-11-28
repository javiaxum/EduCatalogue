using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Institutions
{
    public class Details
    {
        public class Query : IRequest<Institution>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Institution>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Institution> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Institutions.FindAsync(request.Id);
            }
        }

    }
}