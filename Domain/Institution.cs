using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Institution
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string SiteURL { get; set; }
        public string TitleImage { get; set; }
        public ICollection<InstitutionSpecialty> Specialties { get; set; }
    }
}