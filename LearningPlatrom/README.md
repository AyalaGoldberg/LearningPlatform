# LearningPlatrom Project

## Overview
LearningPlatrom is a comprehensive application that integrates an AI service with a RESTful API and a React-based dashboard. The project is structured into several sub-projects, each serving a specific purpose.

## Project Structure
- **LearningPlatrom.API**: This project contains the REST API for the application.
  - **Controllers**: Manages API requests, including the `AiController` for handling AI-related prompts.
  - **Models**: Defines data structures such as `ApiResponse` for API responses.
  - **Program.cs**: The entry point for the API application.
  - **appsettings.json**: Contains configuration settings like connection strings and API keys.

- **LearningPlatrom.Data**: This project manages the database interactions.
  - **Entities**: Contains entity classes such as `User`, `Prompt`, and `Session` representing the database tables.
  - **LearningPlatromDbContext.cs**: Defines the database context for Entity Framework.
  - **Migrations**: Contains migration files for database schema changes.

- **LearningPlatrom.AIService**: This project handles interactions with the GPT API.
  - **Services**: Contains the `GptService` class for making API calls to the GPT service.
  - **AiServiceConfig.cs**: Holds configuration settings specific to the AI service.

- **LearningPlatrom.Dashboard**: This project is the frontend of the application built with React.
  - **public/index.html**: The main HTML file for the React application.
  - **src/components**: Contains React components such as `Login` and `PromptSelector`.
  - **src/App.tsx**: The main application component.
  - **src/index.tsx**: The entry point for the React application.
  - **package.json**: Lists dependencies and scripts for the React application.
  - **tsconfig.json**: TypeScript configuration settings.

- **LearningPlatrom.sln**: The solution file that organizes all the projects within the solution.

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the `LearningPlatrom.API` directory and run the following command to restore dependencies:
   ```
   dotnet restore
   ```
3. Run the API project:
   ```
   dotnet run
   ```
4. Navigate to the `LearningPlatrom.Dashboard` directory and install the necessary packages:
   ```
   npm install
   ```
5. Start the React application:
   ```
   npm start
   ```

## Usage Guidelines
- Access the API documentation via Swagger at `http://localhost:<port>/swagger`.
- Use the React dashboard to log in and interact with the AI service by selecting prompts and categories.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.