using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class StudyForm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Institution> Institutions { get; set; } = new List<Institution>();
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
    }
}