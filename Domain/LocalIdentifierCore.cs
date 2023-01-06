using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class LocalIdentifierCore
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<SpecialtyCore> SpecialtyCores { get; set; } = new List<SpecialtyCore>();
    }
}