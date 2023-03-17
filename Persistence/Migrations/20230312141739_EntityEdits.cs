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
            migrationBuilder.DropForeignKey(
                name: "FK_LanguageSpecialty_Specialties_SpecialtyId",
                table: "LanguageSpecialty");

            migrationBuilder.DropForeignKey(
                name: "FK_SpecialtyStudyForm_Specialties_SpecialtyId",
                table: "SpecialtyStudyForm");

            migrationBuilder.RenameColumn(
                name: "SpecialtyId",
                table: "SpecialtyStudyForm",
                newName: "SpecialtiesId");

            migrationBuilder.RenameColumn(
                name: "SpecialtyId",
                table: "LanguageSpecialty",
                newName: "SpecialtiesId");

            migrationBuilder.RenameIndex(
                name: "IX_LanguageSpecialty_SpecialtyId",
                table: "LanguageSpecialty",
                newName: "IX_LanguageSpecialty_SpecialtiesId");

            migrationBuilder.AddForeignKey(
                name: "FK_LanguageSpecialty_Specialties_SpecialtiesId",
                table: "LanguageSpecialty",
                column: "SpecialtiesId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SpecialtyStudyForm_Specialties_SpecialtiesId",
                table: "SpecialtyStudyForm",
                column: "SpecialtiesId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LanguageSpecialty_Specialties_SpecialtiesId",
                table: "LanguageSpecialty");

            migrationBuilder.DropForeignKey(
                name: "FK_SpecialtyStudyForm_Specialties_SpecialtiesId",
                table: "SpecialtyStudyForm");

            migrationBuilder.RenameColumn(
                name: "SpecialtiesId",
                table: "SpecialtyStudyForm",
                newName: "SpecialtyId");

            migrationBuilder.RenameColumn(
                name: "SpecialtiesId",
                table: "LanguageSpecialty",
                newName: "SpecialtyId");

            migrationBuilder.RenameIndex(
                name: "IX_LanguageSpecialty_SpecialtiesId",
                table: "LanguageSpecialty",
                newName: "IX_LanguageSpecialty_SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "FK_LanguageSpecialty_Specialties_SpecialtyId",
                table: "LanguageSpecialty",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SpecialtyStudyForm_Specialties_SpecialtyId",
                table: "SpecialtyStudyForm",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
