using Microsoft.AspNetCore.Mvc;
using LearningPlatrom.Data;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly LearningPlatromDbContext _db;
    public CategoriesController(LearningPlatromDbContext db) => _db = db;

    [HttpGet]
    public IActionResult GetCategories() => Ok(_db.Categories.ToList());
}