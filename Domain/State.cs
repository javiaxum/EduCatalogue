using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class State
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<City> Cities { get; set; }
    }
}