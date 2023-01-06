using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EntityRework : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UaCode",
                table: "SpecialtyCores",
                newName: "LocalBranchId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "SpecialtyCores",
                newName: "LICoreId");

            migrationBuilder.RenameColumn(
                name: "IscedCode",
                table: "SpecialtyCores",
                newName: "ISCEDCoreId");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Institutions",
                newName: "StreetAddress");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Institutions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactInformation",
                table: "Institutions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmblemImage",
                table: "Institutions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StudentCount",
                table: "Institutions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ISCEDCore",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ISCEDCore", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LocalIdentifierCore",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocalIdentifierCore", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    InstitutionId = table.Column<Guid>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ReviewMessage = table.Column<string>(type: "TEXT", nullable: true),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reviews_Institutions_InstitutionId",
                        column: x => x.InstitutionId,
                        principalTable: "Institutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SpecialtyCores_ISCEDCoreId",
                table: "SpecialtyCores",
                column: "ISCEDCoreId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecialtyCores_LICoreId",
                table: "SpecialtyCores",
                column: "LICoreId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecialtyCores_LocalBranchId",
                table: "SpecialtyCores",
                column: "LocalBranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AppUserId",
                table: "Reviews",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_InstitutionId",
                table: "Reviews",
                column: "InstitutionId");

            migrationBuilder.AddForeignKey(
                name: "FK_SpecialtyCores_Branches_LocalBranchId",
                table: "SpecialtyCores",
                column: "LocalBranchId",
                principalTable: "Branches",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SpecialtyCores_ISCEDCore_ISCEDCoreId",
                table: "SpecialtyCores",
                column: "ISCEDCoreId",
                principalTable: "ISCEDCore",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SpecialtyCores_LocalIdentifierCore_LICoreId",
                table: "SpecialtyCores",
                column: "LICoreId",
                principalTable: "LocalIdentifierCore",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpecialtyCores_Branches_LocalBranchId",
                table: "SpecialtyCores");

            migrationBuilder.DropForeignKey(
                name: "FK_SpecialtyCores_ISCEDCore_ISCEDCoreId",
                table: "SpecialtyCores");

            migrationBuilder.DropForeignKey(
                name: "FK_SpecialtyCores_LocalIdentifierCore_LICoreId",
                table: "SpecialtyCores");

            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "ISCEDCore");

            migrationBuilder.DropTable(
                name: "LocalIdentifierCore");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_SpecialtyCores_ISCEDCoreId",
                table: "SpecialtyCores");

            migrationBuilder.DropIndex(
                name: "IX_SpecialtyCores_LICoreId",
                table: "SpecialtyCores");

            migrationBuilder.DropIndex(
                name: "IX_SpecialtyCores_LocalBranchId",
                table: "SpecialtyCores");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Institutions");

            migrationBuilder.DropColumn(
                name: "ContactInformation",
                table: "Institutions");

            migrationBuilder.DropColumn(
                name: "EmblemImage",
                table: "Institutions");

            migrationBuilder.DropColumn(
                name: "StudentCount",
                table: "Institutions");

            migrationBuilder.RenameColumn(
                name: "LocalBranchId",
                table: "SpecialtyCores",
                newName: "UaCode");

            migrationBuilder.RenameColumn(
                name: "LICoreId",
                table: "SpecialtyCores",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ISCEDCoreId",
                table: "SpecialtyCores",
                newName: "IscedCode");

            migrationBuilder.RenameColumn(
                name: "StreetAddress",
                table: "Institutions",
                newName: "Address");
        }
    }
}
