using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Institutions;
using Application.Profiles;

namespace Domain
{
    public class InstitutionDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string SiteURL { get; set; }
        public string TitleImage { get; set; }
        public ICollection<SpecialtyDTO> Specialties { get; set; }
        public ICollection<Profile> Managers { get; set; }
    }
}