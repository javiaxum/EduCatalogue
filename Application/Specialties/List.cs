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
    public class List
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
                var IsMaxPrice = int.TryParse(request.Params.MaxTuition, out int MaxTuition);
                var IsMinPrice = int.TryParse(request.Params.MinTuition, out int MinTuition);
                var IsDegreeId = int.TryParse(request.Params.DegreeId, out int Degree);
                var IsUndergraduatesEnrolled = int.TryParse(request.Params.UndergraduatesEnrolled, out int UndergraduatesEnrolled);

                var skills = new List<int>();
                if (IsSkillsPredicate)
                    foreach (var sl in request.Params.SkillsPredicate.Split('-'))
                        skills.Add(int.Parse(sl));
                var studyForms = new List<int>();
                if (IsStudyFormsPredicate)
                    foreach (var sf in request.Params.StudyFormsPredicate.Split('-'))
                        studyForms.Add(int.Parse(sf));
                string[] languages = { };
                if (IsLanguagesPredicate)
                    languages = request.Params.LanguagesPredicate.Split('-');

                var query = _context.Specialties
                    .Where(x => x.Institution.Id == request.InstitutionId).Where(s =>
                       (!IsSpecialtiesPredicate || request.Params.SpecialtiesPredicate.Contains(s.SpecialtyCore.Id))
                        && (!IsBranchesPredicate || request.Params.BranchesPredicate.Contains(s.SpecialtyCore.Id.Substring(0, 2)))
                        && (!IsSkillsPredicate || skills.All(si => s.Skills.Any(x => x.Id == si)))
                        && (!IsLanguagesPredicate || languages.All(lg => s.Languages.Any(x => x.Id == lg)))
                        && (!IsStudyFormsPredicate || studyForms.All(sf => s.StudyForms.Any(x => x.Id == sf)))
                        && (!IsMaxPrice || s.TuitionUAH <= MaxTuition)
                        && (!IsMinPrice || s.TuitionUAH >= MinTuition)
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