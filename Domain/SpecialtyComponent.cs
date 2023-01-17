using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SpecialtyComponent
    {
        public Guid SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }
        public int ComponentId { get; set; }
        public Component Component { get; set; }
        public bool isOptional { get; set; }
    }
}