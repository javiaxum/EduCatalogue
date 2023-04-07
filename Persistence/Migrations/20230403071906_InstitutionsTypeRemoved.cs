using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InstitutionsTypeRemoved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Institutions_InstitutionTypes_TypeId",
                table: "Institutions");

            migrationBuilder.DropTable(
                name: "InstitutionTypes");

            migrationBuilder.DropIndex(
                name: "IX_Institutions_TypeId",
                table: "Institutions");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Institutions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Institutions",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InstitutionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstitutionTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Institutions_TypeId",
                table: "Institutions",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Institutions_InstitutionTypes_TypeId",
                table: "Institutions",
                column: "TypeId",
                principalTable: "InstitutionTypes",
                principalColumn: "Id");
        }
    }
}
