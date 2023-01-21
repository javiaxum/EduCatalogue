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

            CreateMap<Institution, InstitutionDTO>()
            .ForMember(d => d.City, o => o.MapFrom(s => s.City.Name))
            .ForMember(d => d.Rating, o => o.MapFrom(s => s.Reviews.Count() > 0 ? s.Reviews.Select(x => x.Rating).Average() : 0));

            CreateMap<Institution, InstitutionDetailedDTO>()
            .ForMember(d => d.City, o => o.MapFrom(s => s.City.Name));

            CreateMap<AppUserInstitution, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Manager.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Manager.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Manager.Image));

            CreateMap<Specialty, Specialty>();

            CreateMap<Specialty, SpecialtyDTO>()
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.Id));

            CreateMap<Specialty, SpecialtyComponentsDTO>()
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.Id))
            .ForMember(d => d.Components, o => o.MapFrom(s => s.Components));

            CreateMap<Component, ComponentDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.ComponentCore.Name))
            .ForMember(d => d.ESCTSCredits, o => o.MapFrom(s => s.ESCTSCredits))
            .ForMember(d => d.isOptional, o => o.MapFrom(s => s.isOptional));


            CreateMap<SpecialtyCore, SpecialtyCoreDTO>()
            .ForMember(d => d.ISCEDCores, o => o.MapFrom(s => s.ISCEDCores));

            CreateMap<ISCEDCore, ISCEDCoreDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Name));

            CreateMap<Review, ReviewDTO>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Image));

            CreateMap<Branch, Branch>();

            CreateMap<City, CityDTO>()
            .ForMember(d => d.InstitutionsCount, o => o.MapFrom(s => s.Institution.Count()));
        }
    }
}