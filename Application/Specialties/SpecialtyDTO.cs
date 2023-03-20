using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.EduComponents;

namespace Application.Specialties
{
    public class SpecialtyDTO
    {
        public Guid Id { get; set; }
        public string LocalSpecialtyCode { get; set; }
        public string Description { get; set; }
        public int DegreeId { get; set; }
        public decimal PriceUAH { get; set; }
        public bool NonPaidEducationAvailable { get; set; }
        public int AcceptanceRate { get; set; }
        public int GraduationRate { get; set; }
        public int GraduateEmploymentRate { get; set; }
        public int UndergraduateCount { get; set; }
        public int EctsCredits { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public ICollection<int> StudyFormsIds { get; set; } = new List<int>();
        public ICollection<string> LanguageIds { get; set; } = new List<string>();
        public ICollection<int> SkillIds { get; set; } = new List<int>();
    }
}