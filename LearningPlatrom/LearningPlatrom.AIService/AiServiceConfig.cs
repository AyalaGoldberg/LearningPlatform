using System;

namespace LearningPlatrom.AIService
{
    public class AiServiceConfig
    {
        public string ApiKey { get; set; }
        public string ApiEndpoint { get; set; }

        public AiServiceConfig()
        {
            // Default values can be set here if needed
            ApiKey = Environment.GetEnvironmentVariable("GPT_API_KEY");
            ApiEndpoint = "https://api.openai.com/v1/engines/davinci-codex/completions";
        }
    }
}