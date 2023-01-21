using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ComponentCore
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Component> Components { get; set; }
    }
}