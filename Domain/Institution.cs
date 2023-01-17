using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Institution
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int StudentCount { get; set; }
        public City City { get; set; }
        public string StreetAddress { get; set; }
        public string SiteURL { get; set; } // can be revorked into separate table with numerous links and icons
        public string TitleImage { get; set; } // images can be revorked into Image <-> Institution relationship with flags matching image type
        public string EmblemImage { get; set; }
        public string ContactInformation { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
        public ICollection<AppUserInstitution> Managers { get; set; } = new List<AppUserInstitution>();
    }
}