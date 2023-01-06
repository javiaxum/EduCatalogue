using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Specialties
{
    public class SpecialtyDTO
    {
        public Guid Id { get; set; }
        public string LocalSpecialtyCode { get; set; }
        public string LocalSpecialtyName { get; set; }
        public string LocalBranchName { get; set; }
        public string ISCEDSpecialtyCode { get; set; }
        public string ISCEDSpecialtyName { get; set; }
        public string Description { get; set; }
        public int EctsCredits { get; set; }
        public string Degree { get; set; }
    }
}