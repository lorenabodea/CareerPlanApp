using System.Collections.Generic;

namespace API.Entities
{
    public class CareerPlan
    {
        public int Id { get; set; }
        public List<Goal> Goals { get; set; }

    }
}