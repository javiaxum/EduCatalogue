using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.EduComponents
{
    public class ComponentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool isOptional { get; set; }
    }
}