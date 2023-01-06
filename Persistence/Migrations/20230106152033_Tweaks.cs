using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Tweaks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AspNetUsers_AppUserId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Reviews",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_AppUserId",
                table: "Reviews",
                newName: "IX_Reviews_AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AspNetUsers_AuthorId",
                table: "Reviews",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AspNetUsers_AuthorId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Reviews",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_AuthorId",
                table: "Reviews",
                newName: "IX_Reviews_AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AspNetUsers_AppUserId",
                table: "Reviews",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
