using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Reviews;
using Domain;

namespace Application.Profiles
{
    public class ProfileDetailed
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public Image Avatar { get; set; }
        public ICollection<ReviewDTO> Reviews { get; set; }
        public ICollection<ManagedInstitution> ManagedInstitutions { get; set; }
    }
}