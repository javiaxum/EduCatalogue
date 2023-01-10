using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SpecialtyCoreDTO
    {
        public Guid Id { get; set; }
        public string LocalSpecialtyCode { get; set; }
        public string LocalSpecialtyName { get; set; }
        public string LocalBranchCode { get; set; }
        public string LocalBranchName { get; set; }
        public string ISCEDSpecialtyCode { get; set; }
        public string ISCEDSpecialtyName { get; set; }
    }
}