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
        public string Description { get; set; }
        public int EctsCredits { get; set; }
        public string Degree { get; set; }
        public decimal PriceUAH { get; set; }
        public bool isBudget { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public Institution Institution { get; set; }
        public ICollection<SpecialtyComponent> Components { get; set; } = new List<SpecialtyComponent>();
    }
}