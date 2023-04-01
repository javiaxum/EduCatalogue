using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Specialty
    {
        public Guid Id { get; set; }
        public bool Visible { get; set; }
        public bool Approved { get; set; }
        public Institution Institution { get; set; }
        public SpecialtyCore SpecialtyCore { get; set; }
        public string Description { get; set; }
        public Degree Degree { get; set; }
        public decimal TuitionUAH { get; set; }
        public bool FreeEducation { get; set; }
        public double AcceptanceRate { get; set; }
        public double GraduationRate { get; set; }
        public double GraduateEmploymentRate { get; set; }
        public int UndergraduatesEnrolled { get; set; }
        public int EctsCredits { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public ICollection<StudyForm> StudyForms { get; set; } = new List<StudyForm>();
        public ICollection<Language> Languages { get; set; } = new List<Language>();
        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
        public ICollection<Component> Components { get; set; } = new List<Component>();
    }
}