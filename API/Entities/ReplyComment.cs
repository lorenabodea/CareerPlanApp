namespace API.Entities
{
    public class ReplyComment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public string CurrentDate { get; set; }
        public int CommentId { get; set; }
        public int CommenterId { get; set; }

    }
}