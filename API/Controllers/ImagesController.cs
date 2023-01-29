using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Images;
using Application.Core;

namespace API.Controllers
{
    public class ImagesController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpPost("profileImage")]
        public async Task<ActionResult> Add([FromForm] AddProfileAvatar.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [AllowAnonymous]
        [HttpPost("institutions/{id}")]
        public async Task<ActionResult> AddInstitutionImage([FromForm] AddInstitutionImage.Command command, Guid id, [FromQuery] ImageParams param)
        {
            command.Id = id;
            command.Params = param;
            return HandleResult(await Mediator.Send(command));
        }
        [AllowAnonymous]
        [HttpDelete("profileImage/{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}