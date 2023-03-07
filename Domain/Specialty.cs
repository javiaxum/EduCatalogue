using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Specialty
    {
        public Guid Id { get; set; }
        public SpecialtyCore SpecialtyCore { get; set; }
        public string Description { get; set; }
        public int EctsCredits { get; set; }
        public Degree Degree { get; set; }
        public int EnrolledStudentsCount { get; set; }
        public int GraduateEmploymentRate { get; set; }
        public decimal PriceUAH { get; set; }
        public bool NonPaidEducationAvailable { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public Institution Institution { get; set; }
        public ICollection<StudyForm> StudyForms { get; set; } = new List<StudyForm>();
        public ICollection<Language> Languages { get; set; } = new List<Language>();
        public ICollection<Component> Components { get; set; } = new List<Component>();
        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
    }
}