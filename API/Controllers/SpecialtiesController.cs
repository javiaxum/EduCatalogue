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
    public class SpecialtiesController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetSpecialties()
        {
            return Ok();
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialty(Guid id)
        {
            return Ok();
        }
        [HttpPost]
        [Authorize(Roles = "Operator, Manager")]
        public async Task<ActionResult> CreateSpecialty(Specialty specialty)
        {
            return Ok();
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Operator, Manager")]
        public async Task<IActionResult> EditSpecialty(Guid id, Specialty specialty)
        {
            specialty.Id = id;
            return Ok();
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Operator")]
        public async Task<ActionResult> DeleteSpecialty(Guid id)
        {
            return Ok();
        }
    }
}