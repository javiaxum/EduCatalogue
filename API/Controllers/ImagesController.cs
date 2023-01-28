using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Images;

namespace API.Controllers
{
    public class ImagesController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpPost("profileImage")]
        public async Task<ActionResult> Add([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [AllowAnonymous]
        [HttpPost("setMainProfileImage/{id}")]
        public async Task<ActionResult> SetMainProfileImage(string id)
        {
            return HandleResult(await Mediator.Send(new SetMainProfileImage.Command { Id = id }));
        }
        [AllowAnonymous]
        [HttpDelete("profileImage/{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}