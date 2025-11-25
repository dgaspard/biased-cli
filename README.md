# biased-cli

**BIASED CLI** - Scaffold and run BIASED AI-ready projects with Docker support.

## Quick Start

### Create a New Project

Create a new Docker-containerized project with the BIASED framework:

```bash
npx biased-cli new
```

This interactive command will prompt you for:
- **Project name**
- **Problem description** - What problem is your project solving?
- **User personas** - Who are your target users?
- **Language/Framework** - Choose from JavaScript, React, Python, Java, or C#

The command creates a complete project with:
- ✅ Docker configuration (Dockerfile + docker-compose.yml)
- ✅ Language-specific application template
- ✅ BIASED framework structure
- ✅ Ready-to-run development environment

**Example:**
```bash
npx biased-cli new
# Follow the prompts, then:
cd my-project
docker-compose up --build
```

### Add BIASED to Existing Project

Add the BIASED framework to an existing project:

```bash
npx biased-cli init
```

## Supported Languages & Frameworks

The `biased new` command supports:

| Language | Framework | Port | Description |
|----------|-----------|------|-------------|
| **JavaScript** | Node.js + Express | 3000 | REST API with Express |
| **React** | Vite + React 18 | 3000 | Modern React SPA |
| **Python** | Flask | 5000 | Python web API |
| **Java** | Spring Boot | 8080 | Enterprise Java API |
| **C#** | ASP.NET Core | 5000 | .NET web API |

Each template includes:
- Multi-stage Dockerfiles for optimized builds
- docker-compose.yml for easy local development
- Health check endpoints
- BIASED framework integration
- Comprehensive README

## BIASED Framework Structure

After running `biased new` or `biased init`, you get:

```
your-project/
├── biased/
│   ├── intent/              # Intent statements
│   │   ├── intent.md
│   │   └── glossary.md
│   ├── behavior/            # Behavior specifications
│   │   ├── behavior-spec.md
│   │   └── edge-cases.md
│   ├── eval/                # Evaluation sets & drift history
│   │   ├── eval-set.jsonl
│   │   ├── eval-config.json
│   │   └── drift-history.csv
│   ├── architecture/        # Architecture decisions
│   │   ├── architecture.md
│   │   └── rag-plan.md
│   ├── governance/          # Governance cards
│   │   ├── governance-card.md
│   │   └── risk-register.md
│   ├── adoption/            # Adoption & UX artifacts
│   │   ├── adoption-metrics.md
│   │   └── workflow-map.md
│   └── metrics/             # Metrics tracking
│       └── weekly-metrics.json
├── src/                     # Your application code
├── Dockerfile               # Docker configuration (new projects)
├── docker-compose.yml       # Docker Compose setup (new projects)
└── README.md
```

## BIASED Scripts

Projects include npm scripts for BIASED workflow:

- `npm run biased:validate` – Checks required BIASED artifacts exist and validates schema
- `npm run biased:eval` – Runs evaluation set against your AI prompts
- `npm run biased:metrics` – Prints weekly metrics from eval + drift files

> The initial versions are intentionally simple. Replace with your real model, RAG stack, and telemetry.

## Docker Workflow

For projects created with `biased new`:

```bash
# Build and start the container
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

## Commands

### `biased new`
Create a new BIASED project with Docker support. Interactive prompts guide you through project setup.

### `biased init`
Add BIASED framework to an existing project in the current directory.

## Template Architecture

The CLI uses a shared template structure:
- `templates/_common/` - Shared BIASED framework files
- `templates/{language}/` - Language-specific templates

This ensures consistency across all project types while minimizing duplication.

## Contributing

PRs welcome! This tool is in active development.

## License

MIT

