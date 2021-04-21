using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController: ControllerBase
    {
        
        private readonly DataContext _context;
        public TasksController(DataContext context)
        {
            _context = context;
        }

         [HttpGet]
        public async Task<ActionResult<IEnumerable<Entities.Task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        [HttpPut]
        public int UpdateTask([FromBody] Entities.Task task) 
        {
            var entity = _context.Tasks.Find(task.Id);
            entity.Done = task.Done;
            return _context.SaveChanges();
        }
    }
}