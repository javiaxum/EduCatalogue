using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsManagerRequirement : IAuthorizationRequirement
    {

    }

    public class IsManagerRequirementHandler : AuthorizationHandler<IsManagerRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsManagerRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsManagerRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine("USERID:" + userId);
            if (userId == null) return Task.CompletedTask;

            var InstitutionOrSpecialtyId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var IsManager = _dbContext.AppUserInstitution
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.ManagerId == userId && x.InstitutionId == InstitutionOrSpecialtyId)
                .Result;

            var InstitutionIdBySpecialty = _dbContext.Specialties
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == InstitutionOrSpecialtyId)
            .Result;

            Guid InstitutionIdBySpecialtyId = new Guid();

            if (InstitutionIdBySpecialty != null && InstitutionIdBySpecialty.Institution != null)
                InstitutionIdBySpecialtyId = InstitutionIdBySpecialty.Institution.Id;

            var IsManagerBySpecialty = _dbContext.AppUserInstitution
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.ManagerId == userId && x.InstitutionId == InstitutionIdBySpecialtyId)
                .Result;

            var IsOperator = _dbContext.Users.FirstOrDefaultAsync(x => x.Email == "EduCatalogue@service.com").Result;

            if (IsManager != null || IsManagerBySpecialty != null || IsOperator.Id == userId) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}