using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Profiles
{
    public class ProfileDTO
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}