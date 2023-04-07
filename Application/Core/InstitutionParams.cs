using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class InstitutionParams : PagingParams
    {
        public string Name { get; set; }
        public string BranchesPredicate { get; set; }
        public string SpecialtiesPredicate { get; set; }
        public string CitiesPredicate { get; set; } 
        public string MinTuition { get; set; }
        public string MaxTuition { get; set; }
        public string DegreeId { get; set; }
        public string Sorting { get; set; } 
    }

}