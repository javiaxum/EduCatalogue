using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Reviews;
using Domain;

namespace API.DTOs
{
    public class AppUserDTO
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public Image Avatar { get; set; }
    }
}