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
using Application.Specialties;

namespace API.Controllers
{
    public class InstitutionsController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetInstitutions()
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.List.Query()));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInstitution(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.Details.Query { Id = id }));
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateInstitution(Institution institution)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.Create.Command { Institution = institution }));
        }
        [AllowAnonymous]
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
        [AllowAnonymous]
        [HttpGet("{id}/specialties")]
        public async Task<IActionResult> GetInstitutionSpecialties(Guid id)
        {
            return HandleResult(await Mediator.Send(new ListInstitutionSpecialties.Query { Id = id }));
        }
        [AllowAnonymous]
        [HttpPost("{id}/specialties")]
        public async Task<IActionResult> CreateInstitutionSpecialty(Guid id, SpecialtyFormValues specialty)
        {
            return HandleResult(await Mediator.Send(new Application.Specialties.Create.Command
            {
                Specialty = specialty
            }));
        }
    }
}