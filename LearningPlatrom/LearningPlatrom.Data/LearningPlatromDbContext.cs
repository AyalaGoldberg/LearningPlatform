using Microsoft.EntityFrameworkCore;
using LearningPlatrom.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace LearningPlatrom.Data
{
    public class LearningPlatromDbContext : DbContext
    {
        public LearningPlatromDbContext(DbContextOptions<LearningPlatromDbContext> options)
            : base(options)
        {
        }

        public DbSet<Entities.User> Users { get; set; }
        public DbSet<Entities.Prompt> Prompts { get; set; }
        public DbSet<Entities.Category> Categories { get; set; }
        public DbSet<Entities.SubCategory> SubCategories { get; set; }
        public DbSet<Entities.AdminUser> AdminUsers { get; set; }
        public DbSet<Session> Sessions { get; set; }


        // public DbSet<Entities.Session> Sessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Additional configuration can be done here
        }
    }
}