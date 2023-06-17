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
    public class IsManagerOrOperatorRequirement : IAuthorizationRequirement
    {

    }

    public class IsManagerOrOperatorRequirementHandler : AuthorizationHandler<IsManagerOrOperatorRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsManagerOrOperatorRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsManagerOrOperatorRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Task.CompletedTask;

            var Id = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var IsManager = _dbContext.AppUserInstitution
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.ManagerId == userId && x.InstitutionId == Id)
                .Result;

            var institutionIdBySpecialty = _dbContext.Specialties
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == Id)
                .Result;

            Id = Id == Guid.Empty ? institutionIdBySpecialty != null ? institutionIdBySpecialty.Institution.Id : Guid.Empty : Id;

            if (Id == Guid.Empty) return Task.CompletedTask;

            var IsManagerBySpecialty = _dbContext.AppUserInstitution
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.ManagerId == userId && x.InstitutionId == Id)
                .Result;

            var IsOperator = _dbContext.Users.FirstOrDefaultAsync(x => x.Email == "EduCatalogue@service.com").Result;

            if (IsManager == null && IsOperator.Id != userId) return Task.CompletedTask;

            context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}