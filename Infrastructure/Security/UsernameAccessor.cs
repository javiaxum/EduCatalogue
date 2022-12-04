using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;

namespace Infrastructure.Security
{
    public class UsernameAccessor : IUsernameAccessor
    {
        public UsernameAccessor()
        {
        }

        public string GetUsername()
        {
            throw new NotImplementedException();
        }
    }
}