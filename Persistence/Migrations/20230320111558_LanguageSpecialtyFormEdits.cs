using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class LanguageSpecialtyFormEdits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InstitutionLanguage",
                columns: table => new
                {
                    InstitutionsId = table.Column<Guid>(type: "uuid", nullable: false),
                    LanguagesId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstitutionLanguage", x => new { x.InstitutionsId, x.LanguagesId });
                    table.ForeignKey(
                        name: "FK_InstitutionLanguage_Institutions_InstitutionsId",
                        column: x => x.InstitutionsId,
                        principalTable: "Institutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InstitutionLanguage_Languages_LanguagesId",
                        column: x => x.LanguagesId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InstitutionStudyForm",
                columns: table => new
                {
                    InstitutionsId = table.Column<Guid>(type: "uuid", nullable: false),
                    StudyFormsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstitutionStudyForm", x => new { x.InstitutionsId, x.StudyFormsId });
                    table.ForeignKey(
                        name: "FK_InstitutionStudyForm_Institutions_InstitutionsId",
                        column: x => x.InstitutionsId,
                        principalTable: "Institutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InstitutionStudyForm_StudyForms_StudyFormsId",
                        column: x => x.StudyFormsId,
                        principalTable: "StudyForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InstitutionLanguage_LanguagesId",
                table: "InstitutionLanguage",
                column: "LanguagesId");

            migrationBuilder.CreateIndex(
                name: "IX_InstitutionStudyForm_StudyFormsId",
                table: "InstitutionStudyForm",
                column: "StudyFormsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InstitutionLanguage");

            migrationBuilder.DropTable(
                name: "InstitutionStudyForm");
        }
    }
}
