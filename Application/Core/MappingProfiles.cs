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

            CreateMap<InstitutionDTO, Institution>();

            CreateMap<Institution, InstitutionDTO>()
            .ForMember(d => d.BackgroundImageUrl, o => o.MapFrom(s => s.Images.FirstOrDefault(i => i.Id == s.BackgroundImageId).Url))
            .ForMember(d => d.TitleImageUrl, o => o.MapFrom(s => s.Images.FirstOrDefault(i => i.Id == s.TitleImageId).Url))
            .ForMember(d => d.CityId, o => o.MapFrom(s => s.City.Id))
            .ForMember(d => d.CityName, o => o.MapFrom(s => s.City.Name))
            .ForMember(d => d.Rating, o => o.MapFrom(s => s.Reviews.Count() > 0 ? s.Reviews.Select(x => x.Rating).Average() : 0));
            
            CreateMap<Institution, InstitutionDetailedDTO>()
            .ForMember(d => d.CityId, o => o.MapFrom(s => s.City.Id.ToString()))
            .ForMember(d => d.CityName, o => o.MapFrom(s => s.City.Name));

            // CreateMap<AppUserInstitution, Profiles.Profile>()
            // .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Manager.DisplayName))
            // .ForMember(d => d.Username, o => o.MapFrom(s => s.Manager.UserName))
            // .ForMember(d => d.Image, o => o.MapFrom(s => s.Manager.Images.FirstOrDefault(x => x.Type == "ProfileMainImage").Url));

            CreateMap<AppUser, Profiles.ProfileDetailed>()
            .ForMember(d => d.ManagedInstitutions, o => o.MapFrom(s => s.Institutions));

            CreateMap<AppUserInstitution, Profiles.ManagedInstitution>()
            .ForMember(d => d.TitleImageUrl, o => o.MapFrom(s => s.Institution.Images.FirstOrDefault(i => i.Id == s.Institution.TitleImageId).Url))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.InstitutionId))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Institution.Name));

            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.AvatarUrl, o => o.MapFrom(s => s.Avatar.Url));

            CreateMap<Specialty, Specialty>();

            CreateMap<Specialty, SpecialtyDTO>()
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.Id));

            CreateMap<SpecialtyDTO, Specialty>();

            CreateMap<Specialty, SpecialtyComponentsDTO>()
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.Id));

            CreateMap<Component, ComponentDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.ComponentCore.Name))
            .ForMember(d => d.ECTSCredits, o => o.MapFrom(s => s.ECTSCredits))
            .ForMember(d => d.isOptional, o => o.MapFrom(s => s.isOptional));

            CreateMap<SpecialtyCore, SpecialtyCoreDTO>()
            .ForMember(d => d.ISCEDCores, o => o.MapFrom(s => s.ISCEDCores));

            CreateMap<ISCEDCore, ISCEDCoreDTO>();

            CreateMap<Review, ReviewDTO>()
            .ForMember(d => d.InstitutionId, o => o.MapFrom(s => s.Institution.Id));

            CreateMap<Branch, Branch>();

            CreateMap<City, CityDTO>()
            .ForMember(d => d.RegionId, o => o.MapFrom(s => s.Region.Id))
            .ForMember(d => d.InstitutionsCount, o => o.MapFrom(s => s.Institution.Count()));

            CreateMap<Region, RegionDTO>();
        }
    }
}