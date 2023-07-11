using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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
    public class ListForModeration
    {
        public class Query : IRequest<Result<PagedList<SpecialtyDTO>>>
        {
            public SpecialtyParams Params { get; set; }
            public Guid InstitutionId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<SpecialtyDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<SpecialtyDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var IsSpecialtiesPredicate = !String.IsNullOrEmpty(request.Params.SpecialtiesPredicate);
                var IsBranchesPredicate = !String.IsNullOrEmpty(request.Params.BranchesPredicate);
                var IsSkillsPredicate = !String.IsNullOrEmpty(request.Params.SkillsPredicate);
                var IsLanguagesPredicate = !String.IsNullOrEmpty(request.Params.LanguagesPredicate);
                var IsStudyFormsPredicate = !String.IsNullOrEmpty(request.Params.StudyFormsPredicate);
                if (IsSpecialtiesPredicate) IsBranchesPredicate = false;
                var IsMaxTuition = int.TryParse(request.Params.MaxTuition, out int MaxTuition);
                var IsMinTuition = int.TryParse(request.Params.MinTuition, out int MinTuition);
                var IsDegreeId = int.TryParse(request.Params.DegreeId, out int Degree);
                var IsUndergraduatesEnrolled = int.TryParse(request.Params.UndergraduatesEnrolled, out int UndergraduatesEnrolled);

                var skills = new int[0];
                if (IsSkillsPredicate)
                    skills = request.Params.SkillsPredicate.Split('-').Select(x => int.Parse(x)).ToArray();
                var studyForms = new int[0];
                if (IsStudyFormsPredicate)
                    studyForms = request.Params.StudyFormsPredicate.Split('-').Select(x => int.Parse(x)).ToArray();
                var languages = new string[0];
                if (IsLanguagesPredicate)
                    languages = request.Params.LanguagesPredicate.Split('-');

                var query = _context.Specialties
                    .Where(s => (s.Institution.Id == request.InstitutionId));
                query = query.Where(s =>
                        s.Approved == false
                        && (!IsSpecialtiesPredicate || request.Params.SpecialtiesPredicate.Contains(s.SpecialtyCore.Id))
                        && (!IsBranchesPredicate || request.Params.BranchesPredicate.Contains(s.SpecialtyCore.Id.Substring(0, 2)))
                        && (!IsSkillsPredicate || s.Skills.Any(x => skills.Contains(x.Id)))
                        && (!IsStudyFormsPredicate || s.StudyForms.Any(x => studyForms.Contains(x.Id)))
                        && (!IsLanguagesPredicate || s.Languages.Any(x => languages.Contains(x.Id)))
                        && (!IsMaxTuition || s.TuitionUSD <= MaxTuition)
                        && (!IsMinTuition || s.TuitionUSD >= MinTuition)
                        && (!IsDegreeId || s.Degree.Id == Degree));

                var result = query
                .ProjectTo<SpecialtyDTO>(_mapper.ConfigurationProvider);
                var orderedResult = request.Params.ListMostPopular ?
                result.OrderByDescending(x => x.UndergraduatesEnrolled) :
                result.OrderBy(x => x.LocalSpecialtyCode);
                return Result<PagedList<SpecialtyDTO>>.Success(
                    await PagedList<SpecialtyDTO>.CreateAsync(orderedResult, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}