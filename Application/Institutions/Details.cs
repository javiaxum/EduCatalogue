using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Institutions
{
    public class Details
    {
        public class Query : IRequest<Result<Institution>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Institution>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Institution>> Handle(Query request, CancellationToken cancellationToken)
            {
                var institution = await _context.Institutions.FindAsync(request.Id);
                if (institution == null) return null;
                return Result<Institution>.Success(institution);
            }
        }

    }
}