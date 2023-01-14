using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class InstitutionParams : PagingParams
    {
        public ICollection<string> SpecialtyCodes { get; set; } = new List<string>();
        public int MinPrice { get; set; } = 0;
        public int MaxPrice { get; set; } = int.MaxValue;
        public string City { get; set; }
        public int StudentCount { get; set; }
    }

}