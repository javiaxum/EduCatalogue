using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            .ForMember(d => d.City, o => o.MapFrom(s => s.City.Name));

            CreateMap<AppUserInstitution, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Manager.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Manager.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Manager.Image));

            CreateMap<InstitutionSpecialty, SpecialtyDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Specialty.Id))
            .ForMember(d => d.ISCEDSpecialtyCode, o => o.MapFrom(s => s.Specialty.SpecialtyCore.ISCEDCore.Id))
            .ForMember(d => d.ISCEDSpecialtyName, o => o.MapFrom(s => s.Specialty.SpecialtyCore.ISCEDCore.Name))
            .ForMember(d => d.LocalBranchName, o => o.MapFrom(s => s.Specialty.SpecialtyCore.LocalBranch.Name))
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.Specialty.SpecialtyCore.LICore.Name))
            .ForMember(d => d.ISCEDSpecialtyCode, o => o.MapFrom(s => s.Specialty.SpecialtyCore.LICore.Id))
            .ForMember(d => d.EctsCredits, o => o.MapFrom(s => s.Specialty.EctsCredits))
            .ForMember(d => d.Description, o => o.MapFrom(s => s.Specialty.Description))
            .ForMember(d => d.Degree, o => o.MapFrom(s => s.Specialty.Degree));

            CreateMap<SpecialtyFormValues, Specialty>();

            CreateMap<Specialty, Specialty>();

            CreateMap<Specialty, SpecialtyDTO>()
            .ForMember(d => d.ISCEDSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.ISCEDCore.Id))
            .ForMember(d => d.ISCEDSpecialtyName, o => o.MapFrom(s => s.SpecialtyCore.ISCEDCore.Name))
            .ForMember(d => d.LocalBranchName, o => o.MapFrom(s => s.SpecialtyCore.LocalBranch.Name))
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.LICore.Name))
            .ForMember(d => d.ISCEDSpecialtyCode, o => o.MapFrom(s => s.SpecialtyCore.LICore.Id));

            CreateMap<SpecialtyCore, SpecialtyCoreDTO>()
            .ForMember(d => d.ISCEDSpecialtyCode, o => o.MapFrom(s => s.ISCEDCore.Id))
            .ForMember(d => d.ISCEDSpecialtyName, o => o.MapFrom(s => s.ISCEDCore.Name))
            .ForMember(d => d.LocalBranchName, o => o.MapFrom(s => s.LocalBranch.Name))
            .ForMember(d => d.LocalSpecialtyCode, o => o.MapFrom(s => s.LICore.Name))
            .ForMember(d => d.ISCEDSpecialtyCode, o => o.MapFrom(s => s.LICore.Id));

            CreateMap<Review, ReviewDTO>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Image));
        }
    }
}