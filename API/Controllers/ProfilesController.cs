using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseAPIController
    {
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            return HandleResult(await Mediator.Send(new Details.Query {}));
        }
    }
}