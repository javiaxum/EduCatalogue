using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Institutions;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class InstitutionsController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetInstitutions()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInstitution(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateInstitution(Institution institution)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Institution = institution }));
        }
        [Authorize(Policy = "IsInstitutionManager")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditInstitution(Guid id, Institution institution)
        {
            institution.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Institution = institution }));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteInstitution(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}