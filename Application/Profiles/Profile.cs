using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Reviews;
using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string AvatarUrl { get; set; }
        public string Location { get; set; }
        public string Company { get; set; }
        public string SocialAccount1 { get; set; }
        public string SocialAccount2 { get; set; }
        public string SocialAccount3 { get; set; }
    }
}