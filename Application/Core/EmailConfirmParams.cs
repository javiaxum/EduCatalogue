using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class EmailConfirmParams 
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}