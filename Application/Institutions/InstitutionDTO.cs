using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Institutions;
using Application.Profiles;
using Application.Reviews;
using Application.Specialties;

namespace Application
{
    public class InstitutionDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Visible { get; set; }
        public bool Approved { get; set; }
        public string Description { get; set; }
        public int Accreditation { get; set; }
        public int CityId { get; set; }
        public int RegionId { get; set; }
        public double Latitude { get; set; }
        public double Longtitude { get; set; }
        public string StreetAddress { get; set; }
        public string SiteURL { get; set; }
        public string TitleImageUrl { get; set; }
        public string EmblemImageUrl { get; set; }
        public string BackgroundImageUrl { get; set; }
        public string ContactInformation { get; set; }
        public int UndergraduatesEnrolled { get; set; }
        public double Rating { get; set; }
        public int ReviewsCount { get; set; }
        public int SpecialtiesCount { get; set; }
        public double AcceptanceRate { get; set; }
        public double GraduationRate { get; set; }
        public double GraduateEmploymentRate { get; set; }
        public decimal AverageTuitionUAH { get; set; }
        public bool Scholarship { get; set; }
        public ICollection<int> StudyFormIds { get; set; }
        public ICollection<string> LanguageIds { get; set; }
    }
}