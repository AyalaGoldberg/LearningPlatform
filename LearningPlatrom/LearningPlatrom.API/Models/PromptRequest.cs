namespace LearningPlatrom.API.Models
{
    public class PromptRequest
    {
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string PromptText { get; set; }
    }
}