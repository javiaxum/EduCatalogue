using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Institutions
{
    public class CityDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid RegionId { get; set; }
        public int InstitutionsCount { get; set; }
    }
}