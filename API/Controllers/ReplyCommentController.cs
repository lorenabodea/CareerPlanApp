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

    public class ReplyCommentController
    {
        private readonly DataContext _context;
        public ReplyCommentController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<Entities.Goal> AddReplyComment([FromBody] ReplyComment reply)
        {
            _context.ReplyComment.Add(reply);
            _context.SaveChanges();

            var comment = _context.Comment.Find(reply.CommentId);

            var goal = _context.Goals.Find(comment.GoalId);

            var tasks = await _context.Tasks.ToListAsync();
            tasks = tasks.Where(item => item.GoalId == goal.Id).ToList();

            var comments = await _context.Comment.ToListAsync();
            comments = comments.Where(item => item.GoalId == goal.Id).ToList();

            var replys = await _context.ReplyComment.ToListAsync();


            foreach (var item in comments)
            {
                item.ReplyComments = replys.Where(repl => repl.CommentId == item.Id).ToList();
            }


            return _context.Goals.Find(comment.GoalId);

        }
    }
}