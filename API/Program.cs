using System.Text;
using API.Middleware;
using API.Services;
using Application.Core;
using Application.Institutions;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Images;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using WebPWrecover.Services;

internal class Program
{
    private readonly IConfiguration _config;
    public Program(IConfiguration config)
    {
        _config = config;
    }

    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        // Add services to the container.

        builder.Services.AddControllers(opt =>
        {
            var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            opt.Filters.Add(new AuthorizeFilter(policy));
        });
        builder.Services.AddFluentValidationAutoValidation();
        builder.Services.AddFluentValidationClientsideAdapters();
        builder.Services.AddValidatorsFromAssemblyContaining<Create>();
        builder.Services.AddHttpContextAccessor();
        builder.Services.AddScoped<IUsernameAccessor, UsernameAccessor>();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<DataContext>(options =>
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string connStr;

            // Depending on if in development or production, use either FlyIO
            // connection string, or development connection string from env var.
            if (env == "Development")
            {
                // Use connection string from file.
                connStr = builder.Configuration.GetConnectionString("DefaultConnection");
            }
            else
            {
                // Use connection string provided at runtime by FlyIO.
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                // Parse connection URL to connection string for Npgsql
                connUrl = connUrl.Replace("postgres://", string.Empty);
                var pgUserPass = connUrl.Split("@")[0];
                var pgHostPortDb = connUrl.Split("@")[1];
                var pgHostPort = pgHostPortDb.Split("/")[0];
                var pgDb = pgHostPortDb.Split("/")[1];
                var pgUser = pgUserPass.Split(":")[0];
                var pgPass = pgUserPass.Split(":")[1];
                var pgHost = pgHostPort.Split(":")[0];
                var pgPort = pgHostPort.Split(":")[1];
                var updatedHost = pgHost.Replace("flycast", "internal");

                connStr = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
            };

            // Whether the connection string came from the local development configuration file
            // or from the environment variable from FlyIO, use it to set up your DbContext.
            options.UseNpgsql(connStr);
        });

        builder.Services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
            });
        });
        builder.Services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
        builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        builder.Services.AddScoped<IImageAccessor, ImageAccessor>();
        builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));

        builder.Services.AddIdentityCore<AppUser>(opt =>
        {
            opt.Password.RequireNonAlphanumeric = false;
            // opt.SignIn.RequireConfirmedEmail = true; 
        })
        .AddEntityFrameworkStores<DataContext>()
        .AddDefaultTokenProviders()
        .AddSignInManager<SignInManager<AppUser>>();

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]));
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt =>
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false
            };
        }).AddTwoFactorRememberMeCookie();
        builder.Services.AddAuthorization(opt =>
        {
            opt.AddPolicy("IsInstitutionManager", policy =>
            {
                policy.Requirements.Add(new IsManagerRequirement());
            });
            opt.AddPolicy("IsModerator", policy =>
            {
                policy.Requirements.Add(new IsModeratorRequirement());
            });
            opt.AddPolicy("IsOperator", policy =>
            {
                policy.Requirements.Add(new IsOperatorRequirement());
            });
        });
        builder.Services.AddTransient<IAuthorizationHandler, IsOperatorRequirementHandler>();
        builder.Services.AddTransient<IAuthorizationHandler, IsManagerRequirementHandler>();
        builder.Services.AddTransient<IAuthorizationHandler, IsModeratorRequirementHandler>();
        builder.Services.AddScoped<TokenService>();
        builder.Services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = 60000000;
            });
        builder.Services.AddTransient<IEmailSender, EmailSender>();
        builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration.GetSection("SendGrid"));
        var app = builder.Build();

        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<DataContext>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            await context.Database.MigrateAsync();
            await Seed.SeedData(context, userManager);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occured during migration");
        }

        // Configure the HTTP request pipeline.
        app.UseMiddleware<ExceptionMiddleware>();

        app.UseXContentTypeOptions();
        app.UseReferrerPolicy(opt => opt.NoReferrer());
        app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
        app.UseXfo(opt => opt.Deny());
        app.UseCsp(opt => opt
            .BlockAllMixedContent()
            .StyleSources(s => s.Self().UnsafeInline().CustomSources("https://cdn.jsdelivr.net/npm/semantic-ui@2/", "https://unpkg.com/leaflet@1.9.3/", "https://fonts.googleapis.com"))
            .FontSources(s => s.Self().CustomSources("https://cdn.jsdelivr.net/npm/semantic-ui@2/", "https://fonts.gstatic.com", "data:", "https://fonts.googleapis.com"))
            .FormActions(s => s.Self())
            .FrameAncestors(s => s.Self())
            .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "blob:", "data:", "https://platform-lookaside.fbsbx.com", " https://unpkg.com/leaflet@1.9.3", "https://unpkg.com/leaflet@1.9.3/dist/images", "https://c.tile.openstreetmap.org", "https://b.tile.openstreetmap.org", "https://a.tile.openstreetmap.org"))
            .ScriptSources(s => s.Self().CustomSources("https://unpkg.com/leaflet@1.9.3/", "https://connect.facebook.net"))
        );

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                await next.Invoke();
            });
        }

        app.UseRouting();

        app.UseCors("CorsPolicy");

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.MapControllers();
        app.MapFallbackToController("Index", "Fallback");

        await app.RunAsync();
    }
}