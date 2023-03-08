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

namespace API.Controllers
{
    public class SpecialtiesController : BaseAPIController
    {
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        [Authorize(Policy = "IsInstitutionManagerOrOperator")]
        [HttpPut("{id}/specialty/{specialtyId}")]
        public async Task<IActionResult> EditSpecialty(Guid specialtyId, SpecialtyComponentsDTO specialty)
        {
            specialty.Id = specialtyId;
            return HandleResult(await Mediator.Send(new Edit.Command { Specialty = specialty }));
        }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult> DeleteSpecialty(Guid id)
        // {
        //     return Ok();
        // }
    }
}