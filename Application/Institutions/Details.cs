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
    public class Details
    {
        public class Query : IRequest<Result<InstitutionDTO>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<InstitutionDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<InstitutionDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var institution = await _context.Institutions.Include(s => s.Specialties)
                    .ProjectTo<InstitutionDTO>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (institution == null) return null;
                var specialties = await _context.Specialties.Where(s => s.Institution.Id == institution.Id).ToListAsync();
                if (specialties != null && specialties.Count() > 0)
                {
                    institution.AcceptanceRate = specialties.Select(s => s.AcceptanceRate).Average();
                    institution.GraduateEmploymentRate = specialties.Select(s => s.GraduateEmploymentRate).Average();
                    institution.AverageTuitionUAH = specialties.Select(s => s.TuitionUAH).Average();
                    institution.GraduationRate = specialties.Select(s => s.GraduationRate).Average();
                    institution.Scholarship = specialties.Any(s => s.FreeEducation);
                    institution.UndergraduatesEnrolled = specialties.Select(s => s.UndergraduatesEnrolled).Sum();
                }
                return Result<InstitutionDTO>.Success(institution);
            }
        }

    }
}