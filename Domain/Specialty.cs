using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Specialty
    {
        public Guid Id { get; set; }
        public SpecialtyCore SpecialtyCore { get; set; }
        public string UaBranchCode { get => SpecialtyCore.UaCode.Take(2).ToString(); }
        public string Description { get; set; }
        public int EctsCredits { get; set; }
        public string Degree { get; set; }
        public ICollection<InstitutionSpecialty> Institutions { get; set; }
        public ICollection<SpecialtyComponent> Components { get; set; }
    }
}