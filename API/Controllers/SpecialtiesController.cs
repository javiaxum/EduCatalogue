using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.AspNetCore.Authorization;
using Application.Specialties;
using Application.Core;

namespace API.Controllers
{
    public class SpecialtiesController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpGet("{id}/institution/list")]
        public async Task<IActionResult> GetSpecialties([FromQuery] SpecialtyParams param, Guid id)
        {
            return HandlePagedResult(await Mediator.Send(new Application.Specialties.List.Query { Params = param, InstitutionId = id }));
        }
        [AllowAnonymous]
        [HttpGet("{id}/institution/pendingChanges")]
        public async Task<IActionResult> GetSpecialtiesPendingChanges([FromQuery] SpecialtyParams param, Guid id)
        {
            return HandlePagedResult(await Mediator.Send(new Application.Specialties.ListForModeration.Query { Params = param, InstitutionId = id }));
        }
        [Authorize(Policy = "IsOperator")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveChanges(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Specialties.ApproveChanges.Command { Id = id }));
        }
        [Authorize(Policy = "IsInstitutionManagerOrOperator")]
        [HttpPut("toggleVisibility/{id}")]
        public async Task<IActionResult> ToggleVisibility(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Specialties.ToggleVisibility.Command { Id = id }));
        }
        [AllowAnonymous]
        [HttpGet("specialtyCores")]
        public async Task<IActionResult> ListSpecialtyCores()
        {
            return HandleResult(await Mediator.Send(new ListCores.Query { }));
        }
        [AllowAnonymous]
        [HttpGet("branches")]
        public async Task<IActionResult> ListBranches()
        {
            return HandleResult(await Mediator.Send(new ListBranches.Query { }));
        }
        [AllowAnonymous]
        [HttpGet("skills")]
        public async Task<IActionResult> ListSkills()
        {
            return HandleResult(await Mediator.Send(new ListSkills.Query { }));
        }
        [AllowAnonymous]
        [HttpGet("componentCores")]
        public async Task<IActionResult> ListComponentCores()
        {
            return HandleResult(await Mediator.Send(new ListComponentCores.Query { }));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        [Authorize(Policy = "IsInstitutionManagerOrOperator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditSpecialty(Guid id, SpecialtyDetailedDTO specialty)
        {
            specialty.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Specialty = specialty }));
        }
        [Authorize(Policy = "IsInstitutionManagerOrOperator")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSpecialty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}