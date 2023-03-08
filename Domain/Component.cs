using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Component
    {
        public Guid Id { get; set; }
        public ComponentCore ComponentCore { get; set; }
        public int ECTSCredits { get; set; }
        public bool isOptional { get; set; }
        public Specialty Specialty { get; set; }
    }
}