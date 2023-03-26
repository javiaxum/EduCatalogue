using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ComponentDeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Components_Specialties_SpecialtyId",
                table: "Components");

            migrationBuilder.AddForeignKey(
                name: "FK_Components_Specialties_SpecialtyId",
                table: "Components",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Components_Specialties_SpecialtyId",
                table: "Components");

            migrationBuilder.AddForeignKey(
                name: "FK_Components_Specialties_SpecialtyId",
                table: "Components",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "Id");
        }
    }
}
