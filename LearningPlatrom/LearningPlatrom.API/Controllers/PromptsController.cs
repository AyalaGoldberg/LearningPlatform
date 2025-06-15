using Microsoft.AspNetCore.Mvc;
using LearningPlatrom.Data;

[ApiController]
[Route("api/[controller]")]
public class PromptsController : ControllerBase
{
    private readonly LearningPlatromDbContext _db;
    public PromptsController(LearningPlatromDbContext db) => _db = db;

    [HttpGet]
    public IActionResult GetPrompts([FromQuery] int userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
    {
        var query = _db.Prompts.Where(p => p.UserId == userId).OrderByDescending(p => p.CreatedAt);
        int totalCount = query.Count();
        var prompts = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return Ok(new { prompts, totalCount });
    }
    
}