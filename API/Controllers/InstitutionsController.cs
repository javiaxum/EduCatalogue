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
using Application.Core;
using Application;

namespace API.Controllers
{
    public class InstitutionsController : BaseAPIController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetInstitutions([FromQuery] InstitutionParams param)
        {
            return HandlePagedResult(await Mediator.Send(new Application.Institutions.List.Query { Params = param }));
        }
        [Authorize(Policy = "IsOperator")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInstitution(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.Details.Query { Id = id }));
        }
        [HttpPost]
        public async Task<ActionResult> CreateInstitution(InstitutionDTO institution)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.Create.Command { Institution = institution }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditInstitution(Guid id, InstitutionDTO institution)
        {
            institution.Id = id;
            return HandleResult(await Mediator.Send(new Application.Institutions.Edit.Command { Institution = institution }));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteInstitution(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
        [AllowAnonymous]
        [HttpGet("cities")]
        public async Task<IActionResult> GetCities([FromQuery] CitiesParams param)
        {
            return HandleResult(await Mediator.Send(new ListCities.Query { Params = param }));
        }
        [HttpPost("{id}/specialties")]
        public async Task<IActionResult> CreateInstitutionSpecialty(Guid id, SpecialtyDTO specialty)
        {
            return HandleResult(await Mediator.Send(new Application.Specialties.Create.Command
            {
                Id = id,
                Specialty = specialty
            }));
        }
        [HttpPost("{id}/reviews")]
        public async Task<ActionResult> CreateReview(Guid id, Review review)
        {
            return HandleResult(await Mediator.Send(new Application.Reviews.Create.Command { Id = id, Review = review }));
        }
        [AllowAnonymous]
        [HttpGet("regions")]
        public async Task<IActionResult> GetRegions()
        {
            return HandleResult(await Mediator.Send(new ListRegions.Query { }));
        }
    }
}