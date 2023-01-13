using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class LocalIdentifierCore
    {
        
        public ICollection<SpecialtyCore> SpecialtyCores { get; set; } = new List<SpecialtyCore>();
    }
}