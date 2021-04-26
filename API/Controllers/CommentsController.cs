using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController
    {
        private readonly DataContext _context;
        public CommentsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Goal>>> GetComments()
        {
            var comments = await _context.Comment.ToListAsync();
            var replyComments = await _context.ReplyComment.ToListAsync();
            foreach (var comment in comments)
            {
                comment.ReplyComments = replyComments.FindAll(replyComment => replyComment.CommentId == comment.Id);
            }
            return await _context.Goals.ToListAsync();
        }

        [HttpPost]
        public async Task<Entities.Goal> AddComment([FromBody] Comment comment)
        {
            _context.Comment.Add(comment);
            _context.SaveChanges();

            var goal = _context.Goals.Find(comment.GoalId);

            var tasks = await _context.Tasks.ToListAsync();
            tasks = tasks.Where(item => item.GoalId == goal.Id).ToList();

            var comments = await _context.Comment.ToListAsync();
            comments = comments.Where(item => item.GoalId == goal.Id).ToList();

            return _context.Goals.Find(comment.GoalId);
        }

        [HttpPut]
        public Entities.Goal UpdateComment([FromBody] Entities.Comment comment)
        {
            var entity = _context.Comment.Find(comment.Id);
            entity.ReplyComments = comment.ReplyComments;
            entity.CommentText = comment.CommentText;
            entity.CurrentDate = comment.CurrentDate;

            _context.SaveChanges();

            return _context.Goals.Find(comment.GoalId);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comment.FindAsync(id);
            var replyComments = await _context.ReplyComment.ToListAsync();
            replyComments = replyComments.Where(item => item.CommentId == comment.Id).ToList();

            return await _context.Comment.FindAsync(id);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteComment(int id)
        {
            var comment = await _context.Comment.FindAsync(id);

            _context.Comment.Remove(comment);
            _context.SaveChanges();

            var replyComments = await _context.ReplyComment.ToListAsync();

            _context.ReplyComment.Where(r => r.CommenterId == id)
               .ToList().ForEach(x => _context.ReplyComment.Remove(x));

            _context.SaveChanges();

            return id;
        }



    }
}