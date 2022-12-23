using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Institutions;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Institution, Institution>();

            CreateMap<Institution, InstitutionDTO>();

            CreateMap<AppUserInstitution, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Manager.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Manager.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Manager.Image));
            
            CreateMap<InstitutionSpecialty, SpecialtyDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Specialty.Id))
            .ForMember(d => d.SpecialtyCore, o => o.MapFrom(s => s.Specialty.SpecialtyCore))
            .ForMember(d => d.EctsCredits, o => o.MapFrom(s => s.Specialty.EctsCredits))
            .ForMember(d => d.Description, o => o.MapFrom(s => s.Specialty.Description))
            .ForMember(d => d.Degree, o => o.MapFrom(s => s.Specialty.Degree));
        }
    }
}