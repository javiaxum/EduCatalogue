using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Institutions
{
    public class SpecialtyDTO
    {
        public Guid Id { get; set; }
        public SpecialtyCore SpecialtyCore { get; set; }
        public string Description { get; set; }
        public int EctsCredits { get; set; }
        public string Degree { get; set; }
    }
}