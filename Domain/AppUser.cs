using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public Image Avatar { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<AppUserInstitution> Institutions { get; set; } = new List<AppUserInstitution>();

    }
}