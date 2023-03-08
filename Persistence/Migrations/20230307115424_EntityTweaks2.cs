using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EntityTweaks2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SkillSpecialty_Specialties_SpecialtyId",
                table: "SkillSpecialty");

            migrationBuilder.RenameColumn(
                name: "SpecialtyId",
                table: "SkillSpecialty",
                newName: "SpecialtiesId");

            migrationBuilder.RenameIndex(
                name: "IX_SkillSpecialty_SpecialtyId",
                table: "SkillSpecialty",
                newName: "IX_SkillSpecialty_SpecialtiesId");

            migrationBuilder.AddForeignKey(
                name: "FK_SkillSpecialty_Specialties_SpecialtiesId",
                table: "SkillSpecialty",
                column: "SpecialtiesId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SkillSpecialty_Specialties_SpecialtiesId",
                table: "SkillSpecialty");

            migrationBuilder.RenameColumn(
                name: "SpecialtiesId",
                table: "SkillSpecialty",
                newName: "SpecialtyId");

            migrationBuilder.RenameIndex(
                name: "IX_SkillSpecialty_SpecialtiesId",
                table: "SkillSpecialty",
                newName: "IX_SkillSpecialty_SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "FK_SkillSpecialty_Specialties_SpecialtyId",
                table: "SkillSpecialty",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
