# LearningPlatform
learning Platform is a modern learning platform with an ASP.NET Core backend, GPT-powered AI lesson generation, and a React dashboard. Users select categories, submit prompts, and receive AI-generated content, with features like prompt history and admin management for an enhanced learning experience.
---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/LearningPlatform.git
   cd LearningPlatform
   ```

2. **Backend Setup**
   - Navigate to the API folder:
     ```sh
     cd LearningPlatrom/LearningPlatrom.API
     ```
   - Restore dependencies:
     ```sh
     dotnet restore
     ```
   - Configure your database and OpenAI API key in `appsettings.json` (see sample below).
   - Run database migrations:
     ```sh
     dotnet ef database update
     ```
   - Start the API:
     ```sh
     dotnet run
     ```
   - The API will be available at `http://localhost:5028` (or your configured port).

3. **Frontend Setup**
   - Open a new terminal and navigate to the React app:
     ```sh
     cd ../../learning-dashboard
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Create a `.env` file (see sample below).
   - Start the React app:
     ```sh
     npm start
     ```
   - The dashboard will be available at `http://localhost:3000`.

4. **Database with Docker (Optional)**
   - If you want to spin up a SQL Server database with Docker:
     ```sh
     docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong!Passw0rd" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
     ```
   - Update your `appsettings.json` connection string accordingly.

---

## 🛠 Technologies Used

- **Backend:** ASP.NET Core, Entity Framework Core, C#
- **Frontend:** React, Material-UI, JavaScript
- **AI Integration:** OpenAI GPT API
- **Database:** SQL Server
- **Other:** dotenv for configuration

---

## 📝 Assumptions Made

- Users have .NET 8+ and Node.js 18+ installed.
- OpenAI API key is provided by the user and never committed to the repository.
- Database connection string is configured by the user.
- The repository is public and does not contain secrets.

---

## ▶️ How to Run Locally

**Backend:**
- Configure `appsettings.json` with your database and OpenAI key.
- Run `dotnet run` in `LearningPlatrom/LearningPlatrom.API`.

**Frontend:**
- Create a `.env` file in `learning-dashboard` with your API URL.
- Run `npm start` in `learning-dashboard`.

---

## 📄 Sample `.env` File (Frontend)

```env
REACT_APP_API_URL=http://localhost:5028
```

---

## 📄 Sample `appsettings.json` (Backend)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=LearningPlatformDb;User Id=sa;Password=YourStrong!Passw0rd;"
  },
  "OpenAI": {
    "GptApiKey": ""
  }
}
```

---

## 🐳 Docker Compose (Optional)

If you want to use Docker Compose for the database, add a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      SA_PASSWORD: "YourStrong!Passw0rd"
      ACCEPT_EULA: "Y"
    ports:
      - "1433:1433"
```

---

## 💡 Best Practices

- The repository is public with a clear commit history.
- Code is clean, well-documented, and follows best practices.
- Basic input validation and API error handling are implemented.
- Sensitive data is managed via `.env` and `appsettings.json` (never committed).
- Use dotenv/configuration management for all secrets.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📧 Contact

For questions or support, open an issue or contact the maintainer.

---

**Learning Platform** – Empowering education with AI.
