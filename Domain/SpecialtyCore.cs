using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SpecialtyCore
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UaCode { get; set; }
        public string IscedCode { get; set; }
        public string UaBranchCode { get => UaCode.Substring(0,2); }
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
    }
}