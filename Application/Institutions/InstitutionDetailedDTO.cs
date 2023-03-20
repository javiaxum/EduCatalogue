using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Institutions;
using Application.Profiles;
using Application.Reviews;
using Application.Specialties;
using Domain;

namespace Application
{
    public class InstitutionDetailedDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Accreditation { get; set; }
        public int UndergraduateCount { get; set; }
        public int TypeId { get; set; }
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
        public ICollection<Image> Images { get; set; } = new List<Image>();
        // public ICollection<ReviewDTO> Reviews { get; set; } = new List<ReviewDTO>();
    }
}