using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Specialties
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var specialty = await _context.Specialties.FindAsync(request.Id);
                if (specialty == null) return null;
                _context.Remove(specialty);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("An error has occured while deleting the specialty");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}