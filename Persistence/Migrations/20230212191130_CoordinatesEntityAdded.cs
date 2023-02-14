using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CoordinatesEntityAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CoordinatesId",
                table: "Institutions",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Longitude = table.Column<double>(type: "REAL", nullable: false),
                    Latitude = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Institutions_CoordinatesId",
                table: "Institutions",
                column: "CoordinatesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Institutions_Coordinates_CoordinatesId",
                table: "Institutions",
                column: "CoordinatesId",
                principalTable: "Coordinates",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Institutions_Coordinates_CoordinatesId",
                table: "Institutions");

            migrationBuilder.DropTable(
                name: "Coordinates");

            migrationBuilder.DropIndex(
                name: "IX_Institutions_CoordinatesId",
                table: "Institutions");

            migrationBuilder.DropColumn(
                name: "CoordinatesId",
                table: "Institutions");
        }
    }
}
