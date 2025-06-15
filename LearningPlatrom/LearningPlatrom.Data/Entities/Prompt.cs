using System;
namespace LearningPlatrom.Data.Entities
{
    public class Prompt
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string PromptText { get; set; }
        public string Response { get; set; }
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
    }
}