using Microsoft.AspNetCore.Mvc;
using LearningPlatrom.AIService.Services;
using LearningPlatrom.Data;
using LearningPlatrom.Data.Entities;
using LearningPlatrom.API.Models;

namespace LearningPlatrom.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiController : ControllerBase
    {
        private readonly GptService _gptService;
        private readonly LearningPlatromDbContext _db;

        public AiController(GptService gptService, LearningPlatromDbContext db)
        {
            _gptService = gptService;
            _db = db;
        }

        [HttpPost("createNewLesson")]
        public async Task<IActionResult> CreateNewLesson([FromBody] PromptRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.PromptText))
            {
                return BadRequest(new { success = false, message = "Prompt cannot be empty.", data = (string)null });
            }

            try
            {
                // Get category name
                var category = _db.Categories.FirstOrDefault(c => c.Id == req.CategoryId);
                var subCategory = _db.SubCategories.FirstOrDefault(sc => sc.Id == req.SubCategoryId);
                var categoryName = category?.Name ?? "General";
                var subCategoryName = subCategory?.Name ?? "";
                string fullPrompt;
                if (!string.IsNullOrEmpty(subCategoryName))
                {
                    fullPrompt = $"Category: {categoryName}\nSubcategory: {subCategoryName}\n{req.PromptText}";
                }
                else
                {
                    fullPrompt = $"Category: {categoryName}\n{req.PromptText}";
                }
                // Call your GPT service with the full prompt
                var response = await _gptService.GetGptResponseAsync(fullPrompt);

                // Save the prompt to the database
                var prompt = new Prompt
                {
                    UserId = req.UserId,
                    CategoryId = req.CategoryId,
                    SubCategoryId = req.SubCategoryId,
                    PromptText = req.PromptText,
                    Response = response,
                    CreatedAt = DateTime.UtcNow.ToLocalTime()
                };
                _db.Prompts.Add(prompt);
                await _db.SaveChangesAsync();

                // Return both the response and the category
                return Ok(new { response, category = categoryName });
            }
            catch (Exception ex)
            {
                // Log the error (optional: use a logger)
                Console.WriteLine("Error in createNewLesson: " + ex);

                // Always return JSON for errors
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}