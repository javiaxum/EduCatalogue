using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Institutions;
using Application.Profiles;
using Application.Reviews;
using Application.Specialties;

namespace Domain
{
    public class InstitutionDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int StudentCount { get; set; }
        public string City { get; set; }
        public string StreetAddress { get; set; }
        public string SiteURL { get; set; } // can be revorked into separate table with numerous links and icons
        public string TitleImage { get; set; } // images can be reworked into Image <-> Institution relationship with flags matching image type
        public string EmblemImage { get; set; }
        public string ContactInformation { get; set; }
        public double Rating { get => Reviews.Count() > 0 ? Reviews.Select(x => x.Rating).Average() : 0; }
        public ICollection<ReviewDTO> Reviews { get; set; } = new List<ReviewDTO>();
        public ICollection<SpecialtyDTO> Specialties { get; set; } = new List<SpecialtyDTO>();

    }
}