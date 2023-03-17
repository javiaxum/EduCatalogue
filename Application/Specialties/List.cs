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
                var IsMaxPrice = int.TryParse(request.Params.MaxPrice, out int MaxPrice);
                var IsMinPrice = int.TryParse(request.Params.MinPrice, out int MinPrice);
                var IsDegreeId = int.TryParse(request.Params.DegreeId, out int Degree);
                var IsStudentCount = int.TryParse(request.Params.StudentCount, out int StudentCount);

                string[] skills = {};
                if (IsSkillsPredicate)
                    skills = request.Params.SkillsPredicate.Split('-');
                string[] studyForms = {};
                if (IsStudyFormsPredicate)
                    studyForms = request.Params.StudyFormsPredicate.Split('-');
                string[] languages = {};
                if (IsLanguagesPredicate)
                    languages = request.Params.LanguagesPredicate.Split('-');

                var institution = await _context.Institutions
                    .Include(s => s.Specialties)
                        .ThenInclude(x => x.SpecialtyCore)
                    .Include(s => s.Specialties)
                        .ThenInclude(x => x.Degree)
                    .Include(s => s.Specialties)
                        .ThenInclude(x => x.Components)
                    .Include(s => s.Specialties)
                        .ThenInclude(x => x.Languages)
                    .Include(s => s.Specialties)
                        .ThenInclude(x => x.StudyForms)
                    .Include(s => s.Specialties)
                        .ThenInclude(x => x.Skills)
                    .FirstOrDefaultAsync(x => x.Id == request.InstitutionId);
                var query = institution.Specialties.AsQueryable().Where(s =>
                       (!IsSpecialtiesPredicate || request.Params.SpecialtiesPredicate.Contains(s.SpecialtyCore.Id))
                        && (!IsBranchesPredicate || request.Params.BranchesPredicate.Contains(s.SpecialtyCore.Id.Substring(0, 2)))
                        && (!IsSkillsPredicate || skills.All(si => s.Skills.Any(x => x.Id == int.Parse(si))))
                        && (!IsSkillsPredicate || languages.All(si => s.Languages.Any(x => x.Id == si)))
                        && (!IsSkillsPredicate || studyForms.All(si => s.StudyForms.Any(x => x.Id == int.Parse(si))))
                        && (!IsMaxPrice || s.PriceUAH <= MaxPrice)
                        && (!IsMinPrice || s.PriceUAH >= MinPrice)
                        && (!IsDegreeId || s.Degree.Id == Degree));

                var result = query
                .ProjectTo<SpecialtyDTO>(_mapper.ConfigurationProvider).OrderBy(x => x.LocalSpecialtyCode);
                return Result<PagedList<SpecialtyDTO>>.Success(
                    PagedList<SpecialtyDTO>.Create(result, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}