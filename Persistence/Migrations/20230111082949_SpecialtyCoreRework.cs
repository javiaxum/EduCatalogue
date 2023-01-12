using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SpecialtyCoreRework : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpecialtyCores_Branches_LocalBranchId",
                table: "SpecialtyCores");

            migrationBuilder.DropForeignKey(
                name: "FK_SpecialtyCores_ISCEDCore_ISCEDCoreId",
                table: "SpecialtyCores");

            migrationBuilder.DropIndex(
                name: "IX_SpecialtyCores_ISCEDCoreId",
                table: "SpecialtyCores");

            migrationBuilder.DropIndex(
                name: "IX_SpecialtyCores_LocalBranchId",
                table: "SpecialtyCores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ISCEDCore",
                table: "ISCEDCore");

            migrationBuilder.DropColumn(
                name: "ISCEDCoreId",
                table: "SpecialtyCores");

            migrationBuilder.DropColumn(
                name: "LocalBranchId",
                table: "SpecialtyCores");

            migrationBuilder.RenameTable(
                name: "ISCEDCore",
                newName: "ISCEDCores");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ISCEDCores",
                table: "ISCEDCores",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ISCEDCoreSpecialtyCore",
                columns: table => new
                {
                    ISCEDCoresId = table.Column<string>(type: "TEXT", nullable: false),
                    SpecialtyCoresId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ISCEDCoreSpecialtyCore", x => new { x.ISCEDCoresId, x.SpecialtyCoresId });
                    table.ForeignKey(
                        name: "FK_ISCEDCoreSpecialtyCore_ISCEDCores_ISCEDCoresId",
                        column: x => x.ISCEDCoresId,
                        principalTable: "ISCEDCores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ISCEDCoreSpecialtyCore_SpecialtyCores_SpecialtyCoresId",
                        column: x => x.SpecialtyCoresId,
                        principalTable: "SpecialtyCores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ISCEDCoreSpecialtyCore_SpecialtyCoresId",
                table: "ISCEDCoreSpecialtyCore",
                column: "SpecialtyCoresId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ISCEDCoreSpecialtyCore");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ISCEDCores",
                table: "ISCEDCores");

            migrationBuilder.RenameTable(
                name: "ISCEDCores",
                newName: "ISCEDCore");

            migrationBuilder.AddColumn<string>(
                name: "ISCEDCoreId",
                table: "SpecialtyCores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocalBranchId",
                table: "SpecialtyCores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ISCEDCore",
                table: "ISCEDCore",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SpecialtyCores_ISCEDCoreId",
                table: "SpecialtyCores",
                column: "ISCEDCoreId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecialtyCores_LocalBranchId",
                table: "SpecialtyCores",
                column: "LocalBranchId");

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
        }
    }
}
