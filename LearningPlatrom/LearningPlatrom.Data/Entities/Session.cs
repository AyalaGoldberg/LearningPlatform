using System;
namespace LearningPlatrom.Data.Entities
{
    public class Session
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public string Status { get; set; } = string.Empty;

        public User User { get; set; }
    }
}