using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.EduComponents;

namespace Application.Specialties
{
    public class SpecialtyComponentsDTO
    {
        public Guid Id { get; set; }
        public string LocalSpecialtyCode { get; set; }
        public string Description { get; set; }
        public int EctsCredits { get; set; }
        public string Degree { get; set; }
        public decimal PriceUAH { get; set; }
        public bool NonPaidEducationAvailable { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public ICollection<ComponentDTO> Components { get; set; } = new List<ComponentDTO>();
    }
}