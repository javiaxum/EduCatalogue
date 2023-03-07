using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Specialty> Specialty { get; set; } = new List<Specialty>();
    }
}