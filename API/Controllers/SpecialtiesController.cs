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
        [HttpGet]
        public async Task<IActionResult> GetSpecialties(Guid id)
        {
            return Ok();
        }
        [AllowAnonymous]
        [HttpGet("specialtyCores")]
        public async Task<IActionResult> GetSpecialtyCores()
        {
            return HandleResult(await Mediator.Send(new ListCores.Query { }));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        [HttpPost]
        public async Task<ActionResult> CreateSpecialty(SpecialtyDTO specialty)
        {
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditSpecialty(Guid id, Specialty specialty)
        {
            specialty.Id = id;
            return Ok("Specialty Edit handler was not implemented yet");
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSpecialty(Guid id)
        {
            return Ok();
        }
    }
}