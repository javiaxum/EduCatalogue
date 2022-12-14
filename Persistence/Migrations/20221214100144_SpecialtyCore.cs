using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SpecialtyCore : Migration
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

            migrationBuilder.CreateTable(
                name: "SpecialtyCore",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    UaCode = table.Column<string>(type: "TEXT", nullable: true),
                    IscedCode = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialtyCore", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Specialties_SpecialtyCoreId",
                table: "Specialties",
                column: "SpecialtyCoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Specialties_SpecialtyCore_SpecialtyCoreId",
                table: "Specialties",
                column: "SpecialtyCoreId",
                principalTable: "SpecialtyCore",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Specialties_SpecialtyCore_SpecialtyCoreId",
                table: "Specialties");

            migrationBuilder.DropTable(
                name: "SpecialtyCore");

            migrationBuilder.DropIndex(
                name: "IX_Specialties_SpecialtyCoreId",
                table: "Specialties");

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
