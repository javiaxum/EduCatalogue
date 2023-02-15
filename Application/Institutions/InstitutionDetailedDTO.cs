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
        public int StudentCount { get; set; }
        public int CityId { get; set; }
        public int RegionId { get; set; }
        public string Latitude { get; set; }
        public string Longtitude { get; set; }
        public string StreetAddress { get; set; }
        public string SiteURL { get; set; } // can be revorked into separate table with numerous links and icons
        public string TitleImageId { get; set; }
        public string BackgroundImageId { get; set; }
        public string ContactInformation { get; set; }
        public ICollection<Image> Images { get; set; } = new List<Image>();
        public ICollection<ReviewDTO> Reviews { get; set; } = new List<ReviewDTO>();
        public ICollection<SpecialtyDTO> Specialties { get; set; } = new List<SpecialtyDTO>();
    }
}