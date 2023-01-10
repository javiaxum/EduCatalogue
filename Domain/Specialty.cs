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
        public DateTime StartsAt { get; set; }
        public DateTime EndsAt { get; set; }
        public ICollection<InstitutionSpecialty> Institutions { get; set; } = new List<InstitutionSpecialty>();
        public ICollection<SpecialtyComponent> Components { get; set; } = new List<SpecialtyComponent>();
    }
}