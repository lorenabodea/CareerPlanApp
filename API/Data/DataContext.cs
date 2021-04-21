using API.Entities;
using Microsoft.EntityFrameworkCore;

// dotnet ef migrations add InitialCreate -o Data/Migrations
// dotnet ef database update
namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<CareerPlan> CareerPlans { get; set; }
    }
}