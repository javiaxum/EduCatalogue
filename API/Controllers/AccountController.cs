using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Application.Core;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using WebPWrecover.Services;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("/api/[controller]")]
    public class AccountController : BaseAPIController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly IEmailSender _emailSender;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email);

            if (user == null) return Unauthorized("An error has occured while authorizing the user");

            if (user.TwoFactorEnabled)
            {
                var twoFactorResult = await _userManager.VerifyTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider, loginDTO.Code);
                if (twoFactorResult)
                {
                    var signInResult = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
                    if (signInResult.Succeeded)
                        return CreateUserDTO(user, loginDTO.RememberMeSwitch);
                }
                return Unauthorized("An error has occured while authorizing the user");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (result.Succeeded)
                return CreateUserDTO(user, loginDTO.RememberMeSwitch);

            return Unauthorized("An error has occured while authorizing the user");
        }

        [HttpPost("twoFactorCheck")]
        public async Task<ActionResult<bool>> TwoFactorCheck(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email);

            if (user == null) return Unauthorized("An error has occured while authorizing the user");

            if (user.TwoFactorEnabled)
            {
                var confirmationToken = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider);
                await _emailSender.SendEmailAsync(user.Email, "Your 2FA code for login", $"Code: {confirmationToken}");
                return true;
            }
            return false;
        }

        [HttpPost("register")]
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
                var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(confirmationToken);
                var tokenEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
                await _emailSender.SendEmailAsync(user.Email, "Email Verification", $"http://localhost:5172/api/account/confirmEmail?token={tokenEncoded}&email={user.Email}");
                return CreateUserDTO(user, false);
            }
            return BadRequest("An error has occured while registering user");
        }

        [HttpGet("confirmEmail")]
        public async Task<IActionResult> Confirm(string token, string email)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null) return Unauthorized("An error has occured while authorizing the user");
            var tokenDecodedBytes = WebEncoders.Base64UrlDecode(token);
            var tokenDecoded = Encoding.UTF8.GetString(tokenDecodedBytes);
            var result = await _userManager.ConfirmEmailAsync(user, tokenDecoded);
            if (result.Succeeded)
                return Redirect("http://localhost:3000/emailConfirmed");
            return BadRequest("An error has occured while confirming the email");
        }

        [HttpGet("confirmEmailChange")]
        public async Task<IActionResult> ConfirmEmailChange(string token, string newEmail, string email)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null) return Unauthorized("An error has occured while authorizing the user");
            var tokenDecodedBytes = WebEncoders.Base64UrlDecode(token);
            var tokenDecoded = Encoding.UTF8.GetString(tokenDecodedBytes);
            var result = await _userManager.ChangeEmailAsync(user, newEmail, tokenDecoded);
            if (result.Succeeded)
                return Redirect("http://localhost:3000/emailConfirmed");
            return BadRequest("An error has occured while confirming the email");
        }

        [HttpPut("confirmPasswordChange")]
        public async Task<IActionResult> ConfirmPasswordChange(string token, string newPassword, string email)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null) return Unauthorized("An error has occured while authorizing the user");
            var tokenDecodedBytes = WebEncoders.Base64UrlDecode(token);
            var tokenDecoded = Encoding.UTF8.GetString(tokenDecodedBytes);

            var result = await _userManager.ResetPasswordAsync(user, tokenDecoded, newPassword);

            if (result.Succeeded)
                return Redirect("http://localhost:3000/passwordConfirmed");
            return BadRequest("An error has occured while confirming the email");
        }

        [Authorize]
        [HttpGet("requestEmailConfirmation")]
        public async Task<IActionResult> RequestEmailConfirmation()
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting the user");

            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(confirmationToken);
            var tokenEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
            await _emailSender.SendEmailAsync(user.Email, "Email Verification", $"http://localhost:5172/api/account/confirmEmail?token={tokenEncoded}&email={user.Email}");
            return Ok("Confirmation email message has been sent successfully");
        }

        [Authorize]
        [HttpPut("requestEmailChange")]
        public async Task<IActionResult> RequestEmailChange(string newEmail)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting the user");

            var confirmationToken = await _userManager.GenerateChangeEmailTokenAsync(user, newEmail);
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(confirmationToken);
            var tokenEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
            await _emailSender.SendEmailAsync(newEmail, "Email Change Confirmation", $"http://localhost:5172/api/account/confirmEmailChange?token={tokenEncoded}&email={user.Email}&newEmail={newEmail}");
            return Ok("Confirmation email message has been sent successfully");
        }

        [HttpPut("requestPasswordReset")]
        public async Task<IActionResult> RequestPasswordReset(string email)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
                return BadRequest("An error has occured while getting the user");
            var confirmationToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(confirmationToken);
            var tokenEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
            await _emailSender.SendEmailAsync(email, "Password Reset Request", $"http://localhost:3000/passwordResetForm/{tokenEncoded}");
            return Ok("Confirmation email message has been sent successfully");
        }

        [Authorize]
        [HttpGet("requestTwoFactorActivationCode")]
        public async Task<IActionResult> RequestTwoFactorActivationCode()
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting the user");
            if (user.TwoFactorEnabled)
                return BadRequest("An error has occured");
            var confirmationToken = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider);
            await _emailSender.SendEmailAsync(user.Email, "Your code for 2FA activation", $"Code: {confirmationToken}");
            return Ok("The 2fa code has been sent successfully");
        }

        [Authorize]
        [HttpGet("requestTwoFactorDeactivationCode")]
        public async Task<IActionResult> RequestTwoFactorDeactivationCode()
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting the user");
            if (!user.TwoFactorEnabled)
                return BadRequest("An error has occured");
            var confirmationToken = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider);
            await _emailSender.SendEmailAsync(user.Email, "Your 2FA code for deactivation", $"Code: {confirmationToken}");
            return Ok("The 2fa deactivation code has been sent successfully");
        }

        [Authorize]
        [HttpPut("confirmTwoFactorDeactivationCode")]
        public async Task<IActionResult> ConfirmTwoFactorDeactivationCode(string code)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting the user");
            if (!user.TwoFactorEnabled)
                return BadRequest("An error has occured");
            var result = await _userManager.VerifyTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider, code);
            if (result)
                await _userManager.SetTwoFactorEnabledAsync(user, false);
            else
                return BadRequest("An error has occured");
            return Ok("The 2fa has been deactivated successfully");
        }

        [Authorize]
        [HttpPut("confirmTwoFactorActivationCode")]
        public async Task<IActionResult> ConfirmTwoFactorActivationCode(string code)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting the user");
            if (user.TwoFactorEnabled)
                return BadRequest("An error has occured");
            var result = await _userManager.VerifyTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider, code);
            if (result)
                await _userManager.SetTwoFactorEnabledAsync(user, true);
            else
                return BadRequest("An error has occured");
            return Ok("The 2fa has been activated successfully");
        }

        [Authorize]
        [HttpPut("changePassword")]
        public async Task<IActionResult> UpdateUserPassword(PasswordsDTO passwordsDTO)
        {
            var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting user");
            var result = await _userManager.ChangePasswordAsync(user, passwordsDTO.OldPassword, passwordsDTO.NewPassword);
            if (result.Succeeded)
                return Ok();
            return BadRequest();
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

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> EditUserInfo(ProfileFormValues formValues)
        {
            var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting user");
            return HandleResult(await Mediator.Send(new Application.Profiles.EditInfo.Command { User = user, FormValues = formValues }));
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser()
        {
            var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
                return BadRequest("An error has occured while getting user");
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                await _emailSender.SendEmailAsync(ClaimTypes.Email, "Your EduCatalogue account has been deleted successfully", "Thank you for using our services!");
                return Ok("The user has been deleted successfully");
            }
            return BadRequest("An error has occured while deleting the user");
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
