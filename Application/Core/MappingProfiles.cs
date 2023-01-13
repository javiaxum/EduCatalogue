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
            .ForMember(d => d.Specialties, o => o.MapFrom(s => s.Specialties));

            CreateMap<AppUserInstitution, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Manager.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Manager.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Manager.Image));

            CreateMap<InstitutionSpecialty, SpecialtyDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Specialty.Id))
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.Specialty.SpecialtyCore.Id))
            .ForMember(d => d.Description, o => o.MapFrom(s => s.Specialty.Description))
            .ForMember(d => d.EctsCredits, o => o.MapFrom(s => s.Specialty.EctsCredits))
            .ForMember(d => d.Degree, o => o.MapFrom(s => s.Specialty.Degree))
            .ForMember(d => d.PriceUAH, o => o.MapFrom(s => s.Specialty.PriceUAH))
            .ForMember(d => d.StartsAt, o => o.MapFrom(s => s.Specialty.StartsAt))
            .ForMember(d => d.EndsAt, o => o.MapFrom(s => s.Specialty.EndsAt));


            CreateMap<Specialty, Specialty>();

            CreateMap<Specialty, SpecialtyDTO>()
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.Id));

            CreateMap<Specialty, SpecialtyComponentsDTO>()
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.Id))
            .ForMember(d => d.Components, o => o.MapFrom(s => s.Components));

            CreateMap<SpecialtyComponent, ComponentDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Component.Id))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Component.Name))
            .ForMember(d => d.isOptional, o => o.MapFrom(s => s.Component.isOptional))
            .ForMember(d => d.Description, o => o.MapFrom(s => s.Component.Description));
            

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
        }
    }
}