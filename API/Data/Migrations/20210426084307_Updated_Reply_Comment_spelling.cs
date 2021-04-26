using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Updated_Reply_Comment_spelling : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Goals_GoalId",
                table: "Comment");

            migrationBuilder.RenameColumn(
                name: "Commenter",
                table: "ReplyComment",
                newName: "CommenterId");

            migrationBuilder.AlterColumn<int>(
                name: "GoalId",
                table: "Comment",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Goals_GoalId",
                table: "Comment",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Goals_GoalId",
                table: "Comment");

            migrationBuilder.RenameColumn(
                name: "CommenterId",
                table: "ReplyComment",
                newName: "Commenter");

            migrationBuilder.AlterColumn<int>(
                name: "GoalId",
                table: "Comment",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Goals_GoalId",
                table: "Comment",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
