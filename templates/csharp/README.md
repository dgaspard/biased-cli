# {{PROJECT_NAME}}

**Problem**: {{PROJECT_PROBLEM}}

**User Personas**: {{USER_PERSONAS}}

This project follows the **BIASED** operating model:

Intent → Behavior → Evaluation → Architecture → Build → Governance → Release → Adoption

## Quick Start

### Run with Docker

```bash
# Build and start the container
docker-compose up --build

# Access the application
curl http://localhost:5000
```

### Run locally

```bash
# Restore dependencies
dotnet restore

# Run the application
dotnet run
```

## BIASED Workflow

1. Read and complete `biased/intent/intent.md`
2. Translate intent into `biased/behavior/behavior-spec.md`
3. Add/expand `biased/eval/eval-set.jsonl`
4. Run evaluations: `dotnet test`
5. Keep governance + adoption artifacts current

## Project Structure

```
{{PROJECT_NAME}}/
├── Controllers/        # API Controllers
├── biased/            # BIASED framework artifacts
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose setup
└── App.csproj        # .NET project file
```

## Docker Commands

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up

# Stop the container
docker-compose down

# View logs
docker-compose logs -f
```

## API Endpoints

- `GET /` - Main endpoint with project info
- `GET /health` - Health check endpoint
- `GET /swagger` - API documentation (development only)
