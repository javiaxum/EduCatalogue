using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class AppUserInstitution
    {
        public string ManagerId { get; set; }
        public AppUser Manager { get; set; }
        public Guid InstitutionId { get; set; }
        public Institution Institution { get; set; }
    }
}