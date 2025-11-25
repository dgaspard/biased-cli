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
curl http://localhost:8080
```

### Run locally

```bash
# Build the project
mvn clean package

# Run the application
java -jar target/*.jar
```

## BIASED Workflow

1. Read and complete `biased/intent/intent.md`
2. Translate intent into `biased/behavior/behavior-spec.md`
3. Add/expand `biased/eval/eval-set.jsonl`
4. Run evaluations: `mvn test`
5. Keep governance + adoption artifacts current

## Project Structure

```
{{PROJECT_NAME}}/
├── src/main/java/      # Java application source code
├── biased/             # BIASED framework artifacts
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── pom.xml            # Maven configuration
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
