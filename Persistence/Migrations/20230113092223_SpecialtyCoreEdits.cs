using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SpecialtyCoreEdits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpecialtyCores_LocalIdentifierCore_LICoreId",
                table: "SpecialtyCores");

            migrationBuilder.DropTable(
                name: "LocalIdentifierCore");

            migrationBuilder.DropIndex(
                name: "IX_SpecialtyCores_LICoreId",
                table: "SpecialtyCores");

            migrationBuilder.RenameColumn(
                name: "LICoreId",
                table: "SpecialtyCores",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "SpecialtyCores",
                newName: "LICoreId");

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

            migrationBuilder.CreateIndex(
                name: "IX_SpecialtyCores_LICoreId",
                table: "SpecialtyCores",
                column: "LICoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_SpecialtyCores_LocalIdentifierCore_LICoreId",
                table: "SpecialtyCores",
                column: "LICoreId",
                principalTable: "LocalIdentifierCore",
                principalColumn: "Id");
        }
    }
}
