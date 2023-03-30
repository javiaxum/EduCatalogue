using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Reviews;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<ProfileDetailed>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<ProfileDetailed>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUsernameAccessor _usernameAccessor;
            public Handler(DataContext context, IMapper mapper, IUsernameAccessor usernameAccessor)
            {
                _usernameAccessor = usernameAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<ProfileDetailed>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.ProjectTo<ProfileDetailed>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Username == _usernameAccessor.GetUsername());
                return Result<ProfileDetailed>.Success(user);
            }
        }
    }
}