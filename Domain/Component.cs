using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Component
    {
        public int Id { get; set; }
        public ComponentCore ComponentCore { get; set; }
        public int ESCTSCredits { get; set; }
        public bool isOptional { get; set; }
        public Specialty Specialty { get; set; }
    }
}