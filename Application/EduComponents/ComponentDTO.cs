using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.EduComponents
{
    public class ComponentDTO
    {
        public Guid Id { get; set; }
        public int ComponentCoreId { get; set; }
        public string Name { get; set; }
        public int ECTSCredits { get; set; }
        public bool isOptional { get; set; }
    }
}