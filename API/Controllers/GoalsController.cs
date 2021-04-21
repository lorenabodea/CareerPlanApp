using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalsController : ControllerBase
    {

        private readonly DataContext _context;
        public GoalsController(DataContext context)
        {
            _context = context;
        }

        // this should be get by user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoals()
        {
            var goals = await _context.Goals.ToListAsync();
            var tasks = await _context.Tasks.ToListAsync();
            foreach (var goal in goals)
            {
                goal.Tasks = tasks.FindAll(task => task.GoalId == goal.Id);
            }
            return await _context.Goals.ToListAsync();
        }

        [HttpPost]
        public Entities.Goal AddGoal([FromBody] Goal goal)
        {
            _context.Goals.Add(goal);
            _context.SaveChanges();

            return goal;
        }

        [HttpPut]
        public Entities.Goal UpdateGoal([FromBody] Entities.Goal goal)
        {
            var entity = _context.Goals.Find(goal.Id);
            entity.Tasks = goal.Tasks;

            _context.SaveChanges();

            return entity;
        }
    }
}