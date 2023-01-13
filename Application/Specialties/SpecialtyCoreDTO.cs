using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Specialties;

namespace Domain
{
    public class SpecialtyCoreDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<ISCEDCoreDTO> ISCEDCores { get; set; } = new List<ISCEDCoreDTO>();
    }
}