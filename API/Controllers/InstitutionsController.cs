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
        [AllowAnonymous]
        [HttpGet("list")]
        public async Task<IActionResult> GetInstitutions([FromQuery] InstitutionParams param)
        {
            return HandlePagedResult(await Mediator.Send(new Application.Institutions.List.Query { Params = param }));
        }
        [Authorize(Policy = "IsOperator")]
        [HttpGet("pendingChanges")]
        public async Task<IActionResult> GetInstitutionsForModeration([FromQuery] InstitutionParams param)
        {   
            return HandlePagedResult(await Mediator.Send(new Application.Institutions.ListForModeration.Query { Params = param }));
        }
        [Authorize(Policy = "IsOperator")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveChanges(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.ApproveChanges.Command { Id = id }));
        }
        [Authorize(Policy = "IsInstitutionManager")]
        [HttpPut("toggleVisibility/{id}")]
        public async Task<IActionResult> ToggleVisibility(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.ToggleVisibility.Command { Id = id }));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInstitution(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.Details.Query { Id = id }));
        }
        [Authorize(Policy = "IsOperator")]
        [HttpPost]
        public async Task<ActionResult> CreateInstitution(InstitutionDTO institution)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.Create.Command { Institution = institution }));
        }
        [Authorize(Policy = "IsInstitutionManager")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditInstitution(Guid id, InstitutionDTO institution)
        {
            institution.Id = id;
            return HandleResult(await Mediator.Send(new Application.Institutions.Edit.Command { Institution = institution }));
        }
        [Authorize(Policy = "IsOperator")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteInstitution(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Institutions.Delete.Command { Id = id }));
        }
        [AllowAnonymous]
        [HttpGet("cities")]
        public async Task<IActionResult> GetCities([FromQuery] CitiesParams param)
        {
            return HandleResult(await Mediator.Send(new ListCities.Query { Params = param }));
        }
        [Authorize(Policy = "IsInstitutionManager")]
        [HttpPost("{id}/specialties")]
        public async Task<IActionResult> CreateInstitutionSpecialty(Guid id, SpecialtyDetailedDTO specialty)
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
        [HttpGet("{id}/reviews")]
        public async Task<ActionResult> ListInstitutionReviews([FromQuery] ReviewParams param, Guid id)
        {
            return HandlePagedResult(await Mediator.Send(new Application.Institutions.ListReviews.Query { InstitutionId = id, Params = param }));
        }
        [AllowAnonymous]
        [HttpGet("regions")]
        public async Task<IActionResult> GetRegions()
        {
            return HandleResult(await Mediator.Send(new ListRegions.Query { }));
        }
    }
}