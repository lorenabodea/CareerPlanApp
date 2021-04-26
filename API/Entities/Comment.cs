using System.Collections.Generic;

namespace API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public string CurrentDate { get; set; }
        public bool Resolved { get; set; }
        public int CommenterId { get; set; }
        public int GoalId { get; set; }

        public List<ReplyComment> ReplyComments { get; set; }
    }
}