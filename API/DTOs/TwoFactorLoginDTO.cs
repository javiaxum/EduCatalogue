using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TwoFactorLoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Code { get; set; }
        public bool RememberMeSwitch { get; set; }
    }
}