using System.Collections.Generic;

namespace API.Entities
{
    public class Goal
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Task> Tasks { get; set; }
        public List<Comment> Comments { get; set; }
    }
}