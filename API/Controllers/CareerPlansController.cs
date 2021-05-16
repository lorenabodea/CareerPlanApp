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
    public class CareerPlanController
    {

        private readonly DataContext _context;
        public CareerPlanController(DataContext context)
        {
            _context = context;
        }

         [HttpGet]
        public async Task<ActionResult<IEnumerable<CareerPlan>>> GetCareerPlans()
        {
            return await _context.CareerPlans.ToListAsync();
        }

        // api/careerplan/3
        [HttpGet("{id}")]
        public async Task<ActionResult<CareerPlan>> GetCareerPlan(int id)
        {
            return await _context.CareerPlans.FindAsync(id);
        }

    }
}