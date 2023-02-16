using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("/api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<AppUserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email);

            if (user == null) return Unauthorized("An error has occured while authorizing user");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (result.Succeeded)
            {
                return CreateUserDTO(user, loginDTO.RememberMeSwitch);
            }

            return Unauthorized("An error has occured while authorizing user");
        }
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<AppUserDTO>> Register(RegisterDTO registerDTO)
        {

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
            {
                ModelState.AddModelError("email", "Email is already taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDTO.Username))
            {
                ModelState.AddModelError("username", "Username is already taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                UserName = registerDTO.Username,
                Email = registerDTO.Email,
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (result.Succeeded)
            {
                return CreateUserDTO(user, false);
            }

            return BadRequest("An error has occured while registering user");
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AppUserDTO>> GetCurrentUser()
        {
            var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting user");
            return CreateUserDTO(user, false);
        }

        private AppUserDTO CreateUserDTO(AppUser appUser, bool rememberMe)
        {
            return new AppUserDTO
            {
                DisplayName = appUser.DisplayName,
                Token = _tokenService.CreateToken(appUser, rememberMe),
                Username = appUser.UserName,
            };
        }
    }
}
