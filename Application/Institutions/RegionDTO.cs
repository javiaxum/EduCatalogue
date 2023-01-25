using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Institutions;

namespace Application.Institutions
{
    public class RegionDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<CityDTO> Cities { get; set; }
    }
}