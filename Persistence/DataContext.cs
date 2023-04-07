using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<AppUserInstitution> AppUserInstitution { get; set; }
        public DbSet<SpecialtyCore> SpecialtyCores { get; set; }
        public DbSet<ISCEDCore> ISCEDCores { get; set; }
        public DbSet<Specialty> Specialties { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<ComponentCore> ComponentCores { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Degree> Degrees { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<StudyForm> StudyForms { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppUserInstitution>(x => x.HasKey(aa => new { aa.ManagerId, aa.InstitutionId }));

            builder.Entity<AppUserInstitution>()
            .HasOne(m => m.Manager)
            .WithMany(i => i.Institutions)
            .HasForeignKey(aa => aa.ManagerId);

            builder.Entity<AppUserInstitution>()
            .HasOne(i => i.Institution)
            .WithMany(m => m.Managers)
            .HasForeignKey(aa => aa.InstitutionId);

            builder.Entity<Component>()
            .HasOne(s => s.Specialty)
            .WithMany(c => c.Components)
            .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<Component>(x => x.HasKey(aa => new { aa.SpecialtyId, aa.ComponentCoreId }));

            // builder.Entity<Component>()
            //     .HasOne(i => i.Specialty)
            //     .WithMany(s => s.Components)
            //     .HasForeignKey(si => si.SpecialtyId)
            //     .OnDelete(DeleteBehavior.Cascade);
            // builder.Entity<Component>()
            //     .HasOne(s => s.ComponentCore)
            //     .WithMany(i => i.Components)
            //     .HasForeignKey(si => si.ComponentCoreId)
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<SpecialtyComponent>(x => x.HasKey(aa => new { aa.SpecialtyId, aa.ComponentId }));

            // builder.Entity<SpecialtyComponent>()
            //     .HasOne(s => s.Specialty)
            //     .WithMany(c => c.Components)
            //     .OnDelete(DeleteBehavior.Cascade);
            // builder.Entity<SpecialtyComponent>()
            //     .HasOne(c => c.Component)
            //     .WithMany(s => s.Specialties)
            //     .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Review>()
                .HasOne(i => i.Institution)
                .WithMany(r => r.Reviews)
                .OnDelete(DeleteBehavior.Cascade);
        }

        internal Task FirstOrDefault()
        {
            throw new NotImplementedException();
        }
    }
}