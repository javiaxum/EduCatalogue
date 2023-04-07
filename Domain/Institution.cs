using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NpgsqlTypes;

namespace Domain
{
    public class Institution
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Visible { get; set; }
        public bool Approved { get; set; }
        public string Description { get; set; }
        public int Accreditation { get; set; }
        public City City { get; set; }
        public Coordinates Coordinates { get; set; }
        public string StreetAddress { get; set; }
        public string SiteURL { get; set; }
        public string TitleImageId { get; set; }
        public string EmblemImageId { get; set; }
        public string BackgroundImageId { get; set; }
        public string ContactInformation { get; set; }
        public double Rating { get; set; }
        public int ReviewsCount { get; set; }
        public ICollection<StudyForm> StudyForms { get; set; }
        public ICollection<Language> Languages { get; set; }
        public ICollection<Image> Images { get; set; } = new List<Image>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
        public ICollection<AppUserInstitution> Managers { get; set; } = new List<AppUserInstitution>();
    }
}