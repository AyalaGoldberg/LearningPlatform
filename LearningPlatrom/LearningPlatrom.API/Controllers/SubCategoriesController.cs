using Microsoft.AspNetCore.Mvc;
using LearningPlatrom.Data;

[ApiController]
[Route("api/[controller]")]
public class SubCategoriesController : ControllerBase
{
    private readonly LearningPlatromDbContext _db;
    public SubCategoriesController(LearningPlatromDbContext db) => _db = db;

    [HttpGet]
    public IActionResult GetSubCategories([FromQuery] int categoryId)
    {
        var subs = _db.SubCategories.Where(sc => sc.CategoryId == categoryId).ToList();
        return Ok(subs);
    }
}