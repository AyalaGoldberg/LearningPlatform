namespace LearningPlatrom.Data.Entities
{
    public class AdminUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}