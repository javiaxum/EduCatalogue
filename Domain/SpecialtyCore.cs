using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SpecialtyCore
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<ISCEDCore> ISCEDCores { get; set; } = new List<ISCEDCore>();
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
    }
}