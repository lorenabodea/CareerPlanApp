using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Services
{
    public interface IGoalsService
    {
        Task<ActionResult<IEnumerable<Goal>>> GetGoals();
    }
}