namespace API.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public int GoalId { get; set; }
        public string Description { get; set; }
        public int Effort { get; set; }
        public RecurringTypeEnum ReccuringType { get; set; }
        public string Duedate { get; set; }
        public bool Done { get; set; }

    }

    public enum RecurringTypeEnum { weekly, monthly }
}