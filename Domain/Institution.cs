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
        public string TitleImageId { get; set; } 
        public string BackgroundImageId { get; set; }
        public string ContactInformation { get; set; }
        public ICollection<Image> Images { get; set; }  = new List<Image>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
        public ICollection<AppUserInstitution> Managers { get; set; } = new List<AppUserInstitution>();
    }
}