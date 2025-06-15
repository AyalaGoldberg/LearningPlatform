using Microsoft.AspNetCore.Mvc;
using LearningPlatrom.Data;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly LearningPlatromDbContext _db;
    public AdminController(LearningPlatromDbContext db) => _db = db;
}