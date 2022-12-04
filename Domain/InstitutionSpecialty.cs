using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class InstitutionSpecialty
    {
        public Guid InstitutionId { get; set; }
        public Institution Institution { get; set; }
        public Guid SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }
    }
}