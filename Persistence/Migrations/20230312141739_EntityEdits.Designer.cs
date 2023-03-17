﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230312141739_EntityEdits")]
    partial class EntityEdits
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("AvatarId")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("AvatarId");

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
                        .HasColumnType("text");

                    b.Property<Guid>("InstitutionId")
                        .HasColumnType("uuid");

                    b.HasKey("ManagerId", "InstitutionId");

                    b.HasIndex("InstitutionId");

                    b.ToTable("AppUserInstitution");
                });

            modelBuilder.Entity("Domain.Branch", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("Domain.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("RegionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("RegionId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("Domain.Component", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int?>("ComponentCoreId")
                        .HasColumnType("integer");

                    b.Property<int>("ECTSCredits")
                        .HasColumnType("integer");

                    b.Property<Guid?>("SpecialtyId")
                        .HasColumnType("uuid");

                    b.Property<bool>("isOptional")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("ComponentCoreId");

                    b.HasIndex("SpecialtyId");

                    b.ToTable("Components");
                });

            modelBuilder.Entity("Domain.ComponentCore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ComponentCores");
                });

            modelBuilder.Entity("Domain.Coordinates", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Latitude")
                        .HasColumnType("double precision");

                    b.Property<double>("Longitude")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.ToTable("Coordinates");
                });

            modelBuilder.Entity("Domain.Degree", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Degrees");
                });

            modelBuilder.Entity("Domain.ISCEDCore", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ISCEDCores");
                });

            modelBuilder.Entity("Domain.Image", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<Guid?>("InstitutionId")
                        .HasColumnType("uuid");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("InstitutionId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Domain.Institution", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Accreditation")
                        .HasColumnType("integer");

                    b.Property<string>("BackgroundImageId")
                        .HasColumnType("text");

                    b.Property<int?>("CityId")
                        .HasColumnType("integer");

                    b.Property<string>("ContactInformation")
                        .HasColumnType("text");

                    b.Property<int?>("CoordinatesId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("EmblemImageId")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("SiteURL")
                        .HasColumnType("text");

                    b.Property<string>("StreetAddress")
                        .HasColumnType("text");

                    b.Property<int>("StudentCount")
                        .HasColumnType("integer");

                    b.Property<string>("TitleImageId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("CoordinatesId");

                    b.ToTable("Institutions");
                });

            modelBuilder.Entity("Domain.Language", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ISOLanguageName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("Domain.Region", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Regions");
                });

            modelBuilder.Entity("Domain.Review", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AuthorId")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("InstitutionId")
                        .HasColumnType("uuid");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<string>("ReviewMessage")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("InstitutionId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Domain.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("Domain.Specialty", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int?>("DegreeId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("EctsCredits")
                        .HasColumnType("integer");

                    b.Property<int>("EndYear")
                        .HasColumnType("integer");

                    b.Property<int>("EnrolledStudentsCount")
                        .HasColumnType("integer");

                    b.Property<int>("GraduateEmploymentRate")
                        .HasColumnType("integer");

                    b.Property<Guid?>("InstitutionId")
                        .HasColumnType("uuid");

                    b.Property<bool>("NonPaidEducationAvailable")
                        .HasColumnType("boolean");

                    b.Property<decimal>("PriceUAH")
                        .HasColumnType("numeric");

                    b.Property<string>("SpecialtyCoreId")
                        .HasColumnType("text");

                    b.Property<int>("StartYear")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DegreeId");

                    b.HasIndex("InstitutionId");

                    b.HasIndex("SpecialtyCoreId");

                    b.ToTable("Specialties");
                });

            modelBuilder.Entity("Domain.SpecialtyCore", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SpecialtyCores");
                });

            modelBuilder.Entity("Domain.StudyForm", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("StudyForms");
                });

            modelBuilder.Entity("ISCEDCoreSpecialtyCore", b =>
                {
                    b.Property<string>("ISCEDCoresId")
                        .HasColumnType("text");

                    b.Property<string>("SpecialtyCoresId")
                        .HasColumnType("text");

                    b.HasKey("ISCEDCoresId", "SpecialtyCoresId");

                    b.HasIndex("SpecialtyCoresId");

                    b.ToTable("ISCEDCoreSpecialtyCore");
                });

            modelBuilder.Entity("LanguageSpecialty", b =>
                {
                    b.Property<string>("LanguagesId")
                        .HasColumnType("text");

                    b.Property<Guid>("SpecialtiesId")
                        .HasColumnType("uuid");

                    b.HasKey("LanguagesId", "SpecialtiesId");

                    b.HasIndex("SpecialtiesId");

                    b.ToTable("LanguageSpecialty");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

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
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("SkillSpecialty", b =>
                {
                    b.Property<int>("SkillsId")
                        .HasColumnType("integer");

                    b.Property<Guid>("SpecialtiesId")
                        .HasColumnType("uuid");

                    b.HasKey("SkillsId", "SpecialtiesId");

                    b.HasIndex("SpecialtiesId");

                    b.ToTable("SkillSpecialty");
                });

            modelBuilder.Entity("SpecialtyStudyForm", b =>
                {
                    b.Property<Guid>("SpecialtiesId")
                        .HasColumnType("uuid");

                    b.Property<int>("StudyFormsId")
                        .HasColumnType("integer");

                    b.HasKey("SpecialtiesId", "StudyFormsId");

                    b.HasIndex("StudyFormsId");

                    b.ToTable("SpecialtyStudyForm");
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.HasOne("Domain.Image", "Avatar")
                        .WithMany()
                        .HasForeignKey("AvatarId");

                    b.Navigation("Avatar");
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
                    b.HasOne("Domain.Institution", null)
                        .WithMany("Images")
                        .HasForeignKey("InstitutionId");
                });

            modelBuilder.Entity("Domain.Institution", b =>
                {
                    b.HasOne("Domain.City", "City")
                        .WithMany("Institution")
                        .HasForeignKey("CityId");

                    b.HasOne("Domain.Coordinates", "Coordinates")
                        .WithMany()
                        .HasForeignKey("CoordinatesId");

                    b.Navigation("City");

                    b.Navigation("Coordinates");
                });

            modelBuilder.Entity("Domain.Review", b =>
                {
                    b.HasOne("Domain.AppUser", "Author")
                        .WithMany("Reviews")
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
                    b.HasOne("Domain.Degree", "Degree")
                        .WithMany("Specialty")
                        .HasForeignKey("DegreeId");

                    b.HasOne("Domain.Institution", "Institution")
                        .WithMany("Specialties")
                        .HasForeignKey("InstitutionId");

                    b.HasOne("Domain.SpecialtyCore", "SpecialtyCore")
                        .WithMany("Specialties")
                        .HasForeignKey("SpecialtyCoreId");

                    b.Navigation("Degree");

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

            modelBuilder.Entity("LanguageSpecialty", b =>
                {
                    b.HasOne("Domain.Language", null)
                        .WithMany()
                        .HasForeignKey("LanguagesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Specialty", null)
                        .WithMany()
                        .HasForeignKey("SpecialtiesId")
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

            modelBuilder.Entity("SkillSpecialty", b =>
                {
                    b.HasOne("Domain.Skill", null)
                        .WithMany()
                        .HasForeignKey("SkillsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Specialty", null)
                        .WithMany()
                        .HasForeignKey("SpecialtiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SpecialtyStudyForm", b =>
                {
                    b.HasOne("Domain.Specialty", null)
                        .WithMany()
                        .HasForeignKey("SpecialtiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.StudyForm", null)
                        .WithMany()
                        .HasForeignKey("StudyFormsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Navigation("Institutions");

                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("Domain.City", b =>
                {
                    b.Navigation("Institution");
                });

            modelBuilder.Entity("Domain.ComponentCore", b =>
                {
                    b.Navigation("Components");
                });

            modelBuilder.Entity("Domain.Degree", b =>
                {
                    b.Navigation("Specialty");
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
