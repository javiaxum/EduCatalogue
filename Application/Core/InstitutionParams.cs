using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class InstitutionParams : PagingParams
    {
        public string Name { get; set; } = "";
        public string BranchesPredicate { get; set; } = "";
        public string SpecialtiesPredicate { get; set; } = "";
        public string CitiesPredicate { get; set; } = "";
        public string MinPrice { get; set; } = "";
        public string MaxPrice { get; set; } = "";
        public string Degree { get; set; } = "";
        public string Sort { get; set; } = "az";
        public int StudentCount { get; set; }
    }

}