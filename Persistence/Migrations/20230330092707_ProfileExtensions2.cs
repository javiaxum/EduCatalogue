using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ProfileExtensions2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SocialAccounts",
                table: "AspNetUsers",
                newName: "SocialAccount3");

            migrationBuilder.AddColumn<string>(
                name: "SocialAccount1",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialAccount2",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SocialAccount1",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SocialAccount2",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "SocialAccount3",
                table: "AspNetUsers",
                newName: "SocialAccounts");
        }
    }
}
