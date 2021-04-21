using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Removed_Goal_and_task_properties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Done",
                table: "Goals");

            migrationBuilder.RenameColumn(
                name: "Progress",
                table: "Tasks",
                newName: "Effort");

            migrationBuilder.AddColumn<bool>(
                name: "Done",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Done",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "Effort",
                table: "Tasks",
                newName: "Progress");

            migrationBuilder.AddColumn<bool>(
                name: "Done",
                table: "Goals",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
