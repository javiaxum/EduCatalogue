using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.EduComponents;
using Application.Institutions;
using Application.Reviews;
using Application.Specialties;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Institution, Institution>();
            CreateMap<Image, ImageDTO>();

            CreateMap<InstitutionDTO, Institution>()
            .ForMember(d => d.Coordinates, o => o.MapFrom(s => new Coordinates { Latitude = s.Latitude, Longitude = s.Longtitude }));

            CreateMap<Institution, InstitutionDTO>()
            .ForMember(d => d.ReviewsCount, o => o.MapFrom(s => s.Reviews.Count()))
            .ForMember(d => d.SpecialtiesCount, o => o.MapFrom(s => s.Specialties.Count()))
            .ForMember(d => d.AcceptanceRate, o => o.MapFrom(s => s.Specialties.Select(a => a.AcceptanceRate).Average()))
            .ForMember(d => d.GraduationRate, o => o.MapFrom(s => s.Specialties.Select(a => a.GraduationRate).Average()))
            .ForMember(d => d.GraduateEmploymentRate, o => o.MapFrom(s => s.Specialties.Select(a => a.GraduateEmploymentRate).Average()))
            .ForMember(d => d.AverageTuitionUAH, o => o.MapFrom(s => s.Specialties.Select(a => a.TuitionUAH).Average()))
            .ForMember(d => d.Scholarship, o => o.MapFrom(s => s.Specialties.Any(a => a.FreeEducation)))
            .ForMember(d => d.UndergraduatesEnrolled, o => o.MapFrom(s => s.Specialties.Select(u => u.UndergraduatesEnrolled).Sum()))
            .ForMember(d => d.LanguageIds, o => o.MapFrom(s => s.Languages.Select(x => x.Id)))
            .ForMember(d => d.StudyFormIds, o => o.MapFrom(s => s.StudyForms.Select(x => x.Id)))
            .ForMember(d => d.Latitude, o => o.MapFrom(s => s.Coordinates.Latitude))
            .ForMember(d => d.Longtitude, o => o.MapFrom(s => s.Coordinates.Longitude))
            .ForMember(d => d.TypeId, o => o.MapFrom(s => s.Type.Id))
            .ForMember(d => d.TitleImageUrl, o => o.MapFrom(s => s.Images.FirstOrDefault(i => i.Id == s.TitleImageId).Url))
            .ForMember(d => d.EmblemImageUrl, o => o.MapFrom(s => s.Images.FirstOrDefault(i => i.Id == s.EmblemImageId).Url))
            .ForMember(d => d.BackgroundImageUrl, o => o.MapFrom(s => s.Images.FirstOrDefault(i => i.Id == s.BackgroundImageId).Url))
            .ForMember(d => d.CityId, o => o.MapFrom(s => s.City.Id))
            .ForMember(d => d.RegionId, o => o.MapFrom(s => s.City.Region.Id))
            .ForMember(d => d.Rating, o => o.MapFrom(s => s.Reviews.Count() > 0 ? s.Reviews.Select(x => x.Rating).Average() : 0));

            CreateMap<AppUser, Profiles.ProfileDetailed>()
            .ForMember(d => d.ManagedInstitutions, o => o.MapFrom(s => s.Institutions));

            CreateMap<Profiles.ProfileFormValues, AppUser>();
            CreateMap<AppUserInstitution, Profiles.ManagedInstitution>()
            .ForMember(d => d.TitleImageUrl, o => o.MapFrom(s => s.Institution.Images.FirstOrDefault(i => i.Id == s.Institution.TitleImageId).Url))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.InstitutionId))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Institution.Name));

            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.AvatarUrl, o => o.MapFrom(s => s.Avatar.Url));

            CreateMap<Specialty, Specialty>();

            CreateMap<Specialty, SpecialtyDTO>()
            .ForMember(d => d.SkillIds, o => o.MapFrom(s => s.Skills.Select(i => i.Id)))
            .ForMember(d => d.LanguageIds, o => o.MapFrom(s => s.Languages.Select(x => x.Id)))
            .ForMember(d => d.StudyFormIds, o => o.MapFrom(s => s.StudyForms.Select(x => x.Id)))
            .ForMember(d => d.DegreeId, o => o.MapFrom(s => s.Degree.Id))
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.Id));

            CreateMap<SpecialtyDetailedDTO, Specialty>();

            CreateMap<Specialty, SpecialtyDetailedDTO>()
            .ForMember(d => d.InstitutionId, o => o.MapFrom(s => s.Institution.Id))
            .ForMember(d => d.DegreeId, o => o.MapFrom(s => s.Degree.Id))
            .ForMember(d => d.SkillIds, o => o.MapFrom(s => s.Skills.Select(x => x.Id)))
            .ForMember(d => d.ComponentDTOs, o => o.MapFrom(s => s.Components))
            .ForMember(d => d.LanguageIds, o => o.MapFrom(s => s.Languages.Select(x => x.Id)))
            .ForMember(d => d.StudyFormIds, o => o.MapFrom(s => s.StudyForms.Select(x => x.Id)))
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.Id));

            CreateMap<ComponentCore, ComponentCoreDTO>();
            CreateMap<Component, ComponentDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.ComponentCoreId, o => o.MapFrom(s => s.ComponentCore.Id))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.ComponentCore.Name))
            .ForMember(d => d.ECTSCredits, o => o.MapFrom(s => s.ECTSCredits))
            .ForMember(d => d.isOptional, o => o.MapFrom(s => s.isOptional));

            CreateMap<SpecialtyCore, SpecialtyCoreDTO>()
            .ForMember(d => d.ISCEDCores, o => o.MapFrom(s => s.ISCEDCores));

            CreateMap<ISCEDCore, ISCEDCoreDTO>();
            CreateMap<Skill, SkillDTO>();
            CreateMap<Language, LanguageDTO>();
            CreateMap<StudyForm, StudyFormDTO>();

            CreateMap<Review, ReviewDTO>()
            .ForMember(d => d.InstitutionName, o => o.MapFrom(s => s.Institution.Name))
            .ForMember(d => d.InstitutionId, o => o.MapFrom(s => s.Institution.Id));

            CreateMap<Branch, Branch>();

            CreateMap<City, CityDTO>()
            .ForMember(d => d.RegionId, o => o.MapFrom(s => s.Region.Id))
            .ForMember(d => d.InstitutionsCount, o => o.MapFrom(s => s.Institution.Count()));

            CreateMap<Region, RegionDTO>();
        }
    }
}