using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class SpecialtyParams : PagingParams
    {
        public string BranchesPredicate { get; set; }
        public string SpecialtiesPredicate { get; set; }
        public string SkillsPredicate { get; set; }
        public string StudyFormsPredicate { get; set; }
        public string LanguagesPredicate { get; set; }
        public string MinPrice { get; set; }
        public string MaxPrice { get; set; }
        public string DegreeId { get; set; }
        public string StudentCount { get; set; }
        public string NonPaidEducationAvailable { get; set; }
    }
}