using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Component
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool isOptional { get; set; }
        public ICollection<SpecialtyComponent> Specialties { get; set; }
    }
}