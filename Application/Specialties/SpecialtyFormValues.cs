using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Specialties
{
    public class SpecialtyFormValues
    {
        public Guid Id { get; set; }
        public Guid InstitutionId { get; set; }
        public string UaCode { get; set; }
        public string Description { get; set; }
        public int EctsCredits { get; set; }
        public string Degree { get; set; }
    }
}