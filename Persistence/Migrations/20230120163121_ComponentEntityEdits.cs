using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ComponentEntityEdits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SpecialtyComponents");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Components");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Components",
                newName: "SpecialtyId");

            migrationBuilder.AddColumn<int>(
                name: "ComponentCoreId",
                table: "Components",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ESCTSCredits",
                table: "Components",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "isOptional",
                table: "Components",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "ComponentCores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComponentCores", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Components_ComponentCoreId",
                table: "Components",
                column: "ComponentCoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Components_SpecialtyId",
                table: "Components",
                column: "SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Components_ComponentCores_ComponentCoreId",
                table: "Components",
                column: "ComponentCoreId",
                principalTable: "ComponentCores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Components_Specialties_SpecialtyId",
                table: "Components",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Components_ComponentCores_ComponentCoreId",
                table: "Components");

            migrationBuilder.DropForeignKey(
                name: "FK_Components_Specialties_SpecialtyId",
                table: "Components");

            migrationBuilder.DropTable(
                name: "ComponentCores");

            migrationBuilder.DropIndex(
                name: "IX_Components_ComponentCoreId",
                table: "Components");

            migrationBuilder.DropIndex(
                name: "IX_Components_SpecialtyId",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "ComponentCoreId",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "ESCTSCredits",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "isOptional",
                table: "Components");

            migrationBuilder.RenameColumn(
                name: "SpecialtyId",
                table: "Components",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Components",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SpecialtyComponents",
                columns: table => new
                {
                    SpecialtyId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ComponentId = table.Column<int>(type: "INTEGER", nullable: false),
                    isOptional = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialtyComponents", x => new { x.SpecialtyId, x.ComponentId });
                    table.ForeignKey(
                        name: "FK_SpecialtyComponents_Components_ComponentId",
                        column: x => x.ComponentId,
                        principalTable: "Components",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SpecialtyComponents_Specialties_SpecialtyId",
                        column: x => x.SpecialtyId,
                        principalTable: "Specialties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SpecialtyComponents_ComponentId",
                table: "SpecialtyComponents",
                column: "ComponentId");
        }
    }
}
