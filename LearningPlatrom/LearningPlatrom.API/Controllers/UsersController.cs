using Microsoft.AspNetCore.Mvc;
using LearningPlatrom.Data;
using LearningPlatrom.Data.Entities;
using System.Linq;

namespace LearningPlatrom.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly LearningPlatromDbContext _db;

        public UsersController(LearningPlatromDbContext db) => _db = db;

        // Get paginated users with optional search
        [HttpGet]
        public IActionResult GetUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 5, [FromQuery] string? search = null)
        {
            var query = _db.Users.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(u => u.Name.Contains(search) || u.Phone.Contains(search));
            }

            int totalCount = query.Count();

            var users = query
                .OrderBy(u => u.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
        .Select(u => new
        {
            u.Id,
            u.Name,
            u.Phone,
            PromptCount = _db.Prompts.Count(p => p.UserId == u.Id)
        })
        .ToList();

            return Ok(new
            {
                totalCount,
                users
            });
        }


        // Add a new user
        [HttpPost]
        public IActionResult LoginUser([FromBody] User user)
        {
            var existing = _db.Users.FirstOrDefault(u => u.Name == user.Name && u.Phone == user.Phone);
            var userToReturn = existing ?? user;

            if (existing == null)
            {
                _db.Users.Add(user);
                _db.SaveChanges();
            }

            // Check if user is admin
            bool isAdmin = _db.AdminUsers.Any(a => a.UserId == userToReturn.Id);

            // Return user info + isAdmin flag
            return Ok(new
            {
                id = userToReturn.Id,
                name = userToReturn.Name,
                phone = userToReturn.Phone,
                isAdmin
            });
        }
        // Delete a user
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();

            _db.Users.Remove(user);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet("History")]
        public IActionResult GetLearningHistory([FromQuery] int userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var query = _db.Sessions
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.CreatedAt);

            int totalCount = query.Count();

            var sessions = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                totalCount,
                sessions
            });
        }
    }


}