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
        public string Description { get; set; }
        public int StudentCount { get; set; }
        public int CityId { get; set; }
        public int RegionId { get; set; }
        public string Latitude { get; set; }
        public string Longtitude { get; set; }
        public string StreetAddress { get; set; }
        public string SiteURL { get; set; }
        public string TitleImageUrl { get; set; }
        public string BackgroundImageUrl { get; set; }
        public string ContactInformation { get; set; }
        public double Rating { get; set; }
    }
}