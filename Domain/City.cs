using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Region Region { get; set; }        
        public ICollection<Institution> Institution { get; set; } = new List<Institution>();
    }
}