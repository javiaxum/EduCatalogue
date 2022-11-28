using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Institutions
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Institution Institution { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var institution = await _context.Institutions.FindAsync(request.Institution.Id);
                _mapper.Map(request.Institution, institution);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}