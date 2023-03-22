using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EntityEdits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UndergraduateCount",
                table: "Institutions");

            migrationBuilder.RenameColumn(
                name: "UndergraduateCount",
                table: "Specialties",
                newName: "UndergraduatesEnrolled");

            migrationBuilder.RenameColumn(
                name: "PriceUAH",
                table: "Specialties",
                newName: "TuitionUAH");

            migrationBuilder.RenameColumn(
                name: "NonPaidEducationAvailable",
                table: "Specialties",
                newName: "Scholarship");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UndergraduatesEnrolled",
                table: "Specialties",
                newName: "UndergraduateCount");

            migrationBuilder.RenameColumn(
                name: "TuitionUAH",
                table: "Specialties",
                newName: "PriceUAH");

            migrationBuilder.RenameColumn(
                name: "Scholarship",
                table: "Specialties",
                newName: "NonPaidEducationAvailable");

            migrationBuilder.AddColumn<int>(
                name: "UndergraduateCount",
                table: "Institutions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
