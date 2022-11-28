using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<Specialty> Specialties { get; set; }
        public DbSet<SpecialtyComponent> Components { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Specialty>()
                .HasOne(i => i.Institution)
                .WithMany(s => s.Specialties)
                .OnDelete(DeleteBehavior.Cascade);    
            builder.Entity<SpecialtyComponent>()
                .HasOne(s => s.Specialty)
                .WithMany(c => c.Components)
                .OnDelete(DeleteBehavior.Cascade);    
        }
    }
}