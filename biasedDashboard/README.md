# biasedDashboard

**Problem**: Should dashboard metrics for users of BIASED

**User Personas**: organizationAdmin, ProjectAdmin, projectUser, basicUser	

This project follows the **BIASED** operating model:

Intent → Behavior → Evaluation → Architecture → Build → Governance → Release → Adoption

## Quick Start

### Run with Docker

```bash
# Build and start the container
docker-compose up --build

# Access the application
open http://localhost:3000
```

### Run locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## BIASED Workflow

1. Read and complete `biased/intent/intent.md`
2. Translate intent into `biased/behavior/behavior-spec.md`
3. Add/expand `biased/eval/eval-set.jsonl`
4. Run evaluations: `npm run biased:eval`
5. Keep governance + adoption artifacts current

## Project Structure

```
biasedDashboard/
├── src/              # Application source code
├── biased/           # BIASED framework artifacts
├── Dockerfile        # Docker configuration
└── docker-compose.yml # Docker Compose setup
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
