using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class TasksService : ITasksService
    {
         private readonly DataContext _context;

         public TasksService(DataContext context)
        {
            _context = context;
        }
        // public async Task<ActionResult<List<Entities.Task>>> GetTasksByGoalId(int goalId)
        // {
        //     return await _context.Tasks.ToArrayAsync();

            
        // }
    }
}