using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Language
    {
        public string Id { get; set; } // ISO 639-1 language code, assigned manually
        public string ISOLanguageName { get; set; }
        public ICollection<Institution> Institutions { get; set; } = new List<Institution>();
        public ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
    }
}