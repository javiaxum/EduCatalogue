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
        public string Description { get; set; }
        public int Accreditation { get; set; }
        // public int UndergraduatesEnrolled { get; set; }
        public InstitutionType Type { get; set; } //Private Public
        public City City { get; set; }
        public Coordinates Coordinates { get; set; }
        public string StreetAddress { get; set; }
        public string SiteURL { get; set; } // can be revorked into separate table with numerous links and icons
        public string TitleImageId { get; set; }
        public string EmblemImageId { get; set; }
        public string BackgroundImageId { get; set; }
        public string ContactInformation { get; set; }
        // public int SpecialtiesCount { get; set; }
        // public double SpecialtyCoverage { get; set; }
        // public int AcceptanceRate { get; set; }
        // public int GraduationRate { get; set; }
        // public int GraduateEmploymentRate { get; set; }
        // public bool AverageTuitionUAH { get; set; }
        // public bool Scholarship { get; set; }
        public ICollection<StudyForm> StudyForms { get; set; }
        public ICollection<Language> Languages { get; set; }
        public ICollection<Image> Images { get; set; } = new List<Image>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
        public ICollection<AppUserInstitution> Managers { get; set; } = new List<AppUserInstitution>();
    }
}