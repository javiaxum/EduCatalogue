using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SpecialtyCore
    {
        public Guid Id { get; set; }
        public LocalIdentifierCore LICore { get; set; }
        public ISCEDCore ISCEDCore { get; set; }
        public Branch LocalBranch { get; set; }
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
    }
}