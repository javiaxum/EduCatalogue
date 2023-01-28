﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230127163402_ImageEntity")]
    partial class ImageEntity
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Domain.AppUserInstitution", b =>
                {
                    b.Property<string>("ManagerId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("InstitutionId")
                        .HasColumnType("TEXT");

                    b.HasKey("ManagerId", "InstitutionId");

                    b.HasIndex("InstitutionId");

                    b.ToTable("AppUserInstitution");
                });

            modelBuilder.Entity("Domain.Branch", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("Domain.City", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("RegionId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RegionId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("Domain.Component", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ComponentCoreId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ECTSCredits")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("SpecialtyId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("isOptional")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ComponentCoreId");

                    b.HasIndex("SpecialtyId");

                    b.ToTable("Components");
                });

            modelBuilder.Entity("Domain.ComponentCore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ComponentCores");
                });

            modelBuilder.Entity("Domain.ISCEDCore", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ISCEDCores");
                });

            modelBuilder.Entity("Domain.Image", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("AppUserId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("InstitutionId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.HasIndex("InstitutionId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Domain.Institution", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("CityId")
                        .HasColumnType("TEXT");

                    b.Property<string>("ContactInformation")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmblemImage")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("SiteURL")
                        .HasColumnType("TEXT");

                    b.Property<string>("StreetAddress")
                        .HasColumnType("TEXT");

                    b.Property<int>("StudentCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TitleImage")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.ToTable("Institutions");
                });

            modelBuilder.Entity("Domain.Region", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Regions");
                });

            modelBuilder.Entity("Domain.Review", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("AuthorId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("InstitutionId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Rating")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ReviewMessage")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("InstitutionId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Domain.Specialty", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Degree")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("EctsCredits")
                        .HasColumnType("INTEGER");

                    b.Property<int>("EndYear")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("InstitutionId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("NonPaidEducationAvailable")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("PriceUAH")
                        .HasColumnType("TEXT");

                    b.Property<string>("SpecialtyCoreId")
                        .HasColumnType("TEXT");

                    b.Property<int>("StartYear")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("InstitutionId");

                    b.HasIndex("SpecialtyCoreId");

                    b.ToTable("Specialties");
                });

            modelBuilder.Entity("Domain.SpecialtyCore", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("SpecialtyCores");
                });

            modelBuilder.Entity("ISCEDCoreSpecialtyCore", b =>
                {
                    b.Property<string>("ISCEDCoresId")
                        .HasColumnType("TEXT");

                    b.Property<string>("SpecialtyCoresId")
                        .HasColumnType("TEXT");

                    b.HasKey("ISCEDCoresId", "SpecialtyCoresId");

                    b.HasIndex("SpecialtyCoresId");

                    b.ToTable("ISCEDCoreSpecialtyCore");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Domain.AppUserInstitution", b =>
                {
                    b.HasOne("Domain.Institution", "Institution")
                        .WithMany("Managers")
                        .HasForeignKey("InstitutionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.AppUser", "Manager")
                        .WithMany("Institutions")
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Institution");

                    b.Navigation("Manager");
                });

            modelBuilder.Entity("Domain.City", b =>
                {
                    b.HasOne("Domain.Region", "Region")
                        .WithMany("Cities")
                        .HasForeignKey("RegionId");

                    b.Navigation("Region");
                });

            modelBuilder.Entity("Domain.Component", b =>
                {
                    b.HasOne("Domain.ComponentCore", "ComponentCore")
                        .WithMany("Components")
                        .HasForeignKey("ComponentCoreId");

                    b.HasOne("Domain.Specialty", "Specialty")
                        .WithMany("Components")
                        .HasForeignKey("SpecialtyId");

                    b.Navigation("ComponentCore");

                    b.Navigation("Specialty");
                });

            modelBuilder.Entity("Domain.Image", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany("Images")
                        .HasForeignKey("AppUserId");

                    b.HasOne("Domain.Institution", null)
                        .WithMany("Images")
                        .HasForeignKey("InstitutionId");
                });

            modelBuilder.Entity("Domain.Institution", b =>
                {
                    b.HasOne("Domain.City", "City")
                        .WithMany("Institution")
                        .HasForeignKey("CityId");

                    b.Navigation("City");
                });

            modelBuilder.Entity("Domain.Review", b =>
                {
                    b.HasOne("Domain.AppUser", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.HasOne("Domain.Institution", "Institution")
                        .WithMany("Reviews")
                        .HasForeignKey("InstitutionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Author");

                    b.Navigation("Institution");
                });

            modelBuilder.Entity("Domain.Specialty", b =>
                {
                    b.HasOne("Domain.Institution", "Institution")
                        .WithMany("Specialties")
                        .HasForeignKey("InstitutionId");

                    b.HasOne("Domain.SpecialtyCore", "SpecialtyCore")
                        .WithMany("Specialties")
                        .HasForeignKey("SpecialtyCoreId");

                    b.Navigation("Institution");

                    b.Navigation("SpecialtyCore");
                });

            modelBuilder.Entity("ISCEDCoreSpecialtyCore", b =>
                {
                    b.HasOne("Domain.ISCEDCore", null)
                        .WithMany()
                        .HasForeignKey("ISCEDCoresId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.SpecialtyCore", null)
                        .WithMany()
                        .HasForeignKey("SpecialtyCoresId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("Institutions");
                });

            modelBuilder.Entity("Domain.City", b =>
                {
                    b.Navigation("Institution");
                });

            modelBuilder.Entity("Domain.ComponentCore", b =>
                {
                    b.Navigation("Components");
                });

            modelBuilder.Entity("Domain.Institution", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("Managers");

                    b.Navigation("Reviews");

                    b.Navigation("Specialties");
                });

            modelBuilder.Entity("Domain.Region", b =>
                {
                    b.Navigation("Cities");
                });

            modelBuilder.Entity("Domain.Specialty", b =>
                {
                    b.Navigation("Components");
                });

            modelBuilder.Entity("Domain.SpecialtyCore", b =>
                {
                    b.Navigation("Specialties");
                });
#pragma warning restore 612, 618
        }
    }
}
