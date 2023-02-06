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
    public class IsOperatorRequirement : IAuthorizationRequirement
    {

    }

    public class IsOperatorRequirementHandler : AuthorizationHandler<IsOperatorRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsOperatorRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOperatorRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Task.CompletedTask;

            var IsOperator = _dbContext.Users.FirstOrDefaultAsync(x => x.Email == "EduCatalogue@service.com").Result;
            if(IsOperator.Id != userId) return Task.CompletedTask;

            context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}