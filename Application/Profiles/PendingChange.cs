using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Reviews;
using Domain;

namespace Application.Profiles
{
    public class PendingChange
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string TitleImageUrl { get; set; }
        public string InstitutionName { get; set; }
    }
}