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
        public DbSet<InstitutionSpecialty> InstitutionSpecialties { get; set; }
        public DbSet<Specialty> Specialties { get; set; }
        public DbSet<SpecialtyComponent> SpecialtyComponents { get; set; }
        public DbSet<Component> Components { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<InstitutionSpecialty>(x => x.HasKey(aa => new { aa.InstitutionId, aa.SpecialtyId }));

            builder.Entity<InstitutionSpecialty>()
                .HasOne(i => i.Institution)
                .WithMany(s => s.Specialties)
                .HasForeignKey(si => si.InstitutionId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<InstitutionSpecialty>()
                .HasOne(s => s.Specialty)
                .WithMany(i => i.Institutions)
                .HasForeignKey(si => si.SpecialtyId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<SpecialtyComponent>(x => x.HasKey(aa => new { aa.SpecialtyId, aa.ComponentId }));
            builder.Entity<SpecialtyComponent>()
                .HasOne(s => s.Specialty)
                .WithMany(c => c.Components)    
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}