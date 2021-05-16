using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class GoalsService : IGoalsService
    {
        private readonly DataContext _context;

         public GoalsService(DataContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoals() 
        {
           var goals = await _context.Goals.ToListAsync();
           var tasks = await _context.Tasks.ToListAsync();
           var comments = await _context.Comment.ToListAsync();
           var replyComments = await _context.ReplyComment.ToListAsync();

            foreach (var goal in goals)
            {
                goal.Tasks = tasks.FindAll(task => task.GoalId == goal.Id);
                goal.Comments = comments.FindAll(comment => comment.GoalId == goal.Id);
                foreach (var comment in goal.Comments)
                {
                    comment.ReplyComments = replyComments.FindAll(reply => reply.CommentId == comment.Id);
                }
            }

            return goals;
        }
    }
}