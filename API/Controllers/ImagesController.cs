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
        [HttpPost("profileImage")]
        public async Task<ActionResult> Add([FromForm] AddProfileAvatar.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPost("institutions/{id}")]
        public async Task<ActionResult> AddInstitutionImage([FromForm] AddInstitutionImage.Command command, Guid id, [FromQuery] ImageParams param)
        {
            command.Id = id;
            command.Params = param;
            return HandleResult(await Mediator.Send(command));
        }
        [HttpDelete("profileImage/{id}")]
        public async Task<ActionResult> DeleteProfileImage(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteProfileImage.Command { Id = id }));
        }
        [HttpGet("{id}/list")]
        public async Task<ActionResult> ListImages([FromQuery] ImageParams param, Guid id)
        {
            return HandlePagedResult(await Mediator.Send(new Application.Images.List.Query { InstitutionId = id, Params = param }));
        }
        [HttpPost("{institutionId}/changeStatus/{id}")]
        public async Task<ActionResult> SetStatus([FromQuery] ImageParams param, Guid institutionId, string id)
        {
            return HandleResult(await Mediator.Send(new Application.Images.SetStatus.Command { InstitutionId = institutionId, Id = id, Params = param }));
        }
        [Authorize(Policy = "IsInstitutionManagerOrOperator")]
        [HttpDelete("{id}/delete/{imageId}")]
        public async Task<ActionResult> DeleteInstitutionImage(string imageId, Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteInstitutionImage.Command { Id = imageId, InstitutionId = id }));
        }
    }
}