using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SpecialtiesIdentityUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IscedCode",
                table: "Specialties");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Specialties");

            migrationBuilder.RenameColumn(
                name: "UaCode",
                table: "Specialties",
                newName: "SpecialtyCoreId");

            migrationBuilder.AddColumn<Guid>(
                name: "InstitutionId",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SpecialtyCores",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    UaCode = table.Column<string>(type: "TEXT", nullable: true),
                    IscedCode = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialtyCores", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Specialties_SpecialtyCoreId",
                table: "Specialties",
                column: "SpecialtyCoreId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_InstitutionId",
                table: "AspNetUsers",
                column: "InstitutionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Institutions_InstitutionId",
                table: "AspNetUsers",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Specialties_SpecialtyCores_SpecialtyCoreId",
                table: "Specialties",
                column: "SpecialtyCoreId",
                principalTable: "SpecialtyCores",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Institutions_InstitutionId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Specialties_SpecialtyCores_SpecialtyCoreId",
                table: "Specialties");

            migrationBuilder.DropTable(
                name: "SpecialtyCores");

            migrationBuilder.DropIndex(
                name: "IX_Specialties_SpecialtyCoreId",
                table: "Specialties");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_InstitutionId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "SpecialtyCoreId",
                table: "Specialties",
                newName: "UaCode");

            migrationBuilder.AddColumn<string>(
                name: "IscedCode",
                table: "Specialties",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Specialties",
                type: "TEXT",
                nullable: true);
        }
    }
}
