using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace LearningPlatrom.Data.Entities

{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }

        // [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        // public ICollection<Prompt>? Prompts { get; set; } = new List<Prompt>();
    }
}