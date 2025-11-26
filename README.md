# biased-cli

**BIASED CLI** - Add the BIASED framework to any project, regardless of language or tech stack.

## What is BIASED?

BIASED is a framework for AI-ready software development that provides structure for:
- **Intent** - Define what your AI should accomplish
- **Behavior** - Specify expected AI behaviors
- **Evaluation** - Test and measure AI performance
- **Architecture** - Document AI system design
- **Governance** - Manage AI risks and compliance
- **Adoption** - Track AI adoption and UX
- **Documentation** - Store business context for AI
- **Metrics** - Monitor AI system health

## Quick Start

Add the BIASED framework to your existing project:

```bash
npx biased-cli init
```

This creates a `biased/` folder with the complete framework structure in your current directory.

## Installation

### One-time use (recommended)
```bash
npx biased-cli init
```

### Global installation
```bash
npm install -g biased-cli
biased init
```

## Usage

### Initialize BIASED Framework

Run this command in your project root directory:

```bash
biased init
```

**Options:**
- `-n, --name <name>` - Specify project name (defaults to directory name)

**Example:**
```bash
cd my-existing-project
biased init --name "My AI Project"
```

## Framework Structure

After running `biased init`, you'll have:

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
│   ├── docs/                # Business documentation
│   │   ├── branding/        # Brand guides, style guidelines
│   │   ├── business-process/# Process maps, SOPs
│   │   ├── strategy/        # Strategic plans, roadmaps
│   │   ├── onboarding/      # New hire guides
│   │   ├── operations/      # Runbooks, procedures
│   │   └── training/        # Training materials
│   ├── configuration/       # Application configuration
│   │   ├── README.md        # Configuration guide
│   │   └── app.properties.template
│   └── metrics/             # Metrics tracking
│       └── weekly-metrics.json
└── [your existing project files]
```

## Business Documentation

The `biased/docs/` folder provides a structured location for business documentation that AI can reference for context and branding while building applications. This documentation will also be hosted on the BIASED dashboard for your organization.

### Documentation Categories

- **📘 branding/** - Brand identity, style guides, logo usage, color palettes, typography, voice and tone guidelines
- **📊 business-process/** - Business process maps, workflow diagrams, standard operating procedures
- **🎯 strategy/** - Strategic plans, roadmaps, vision statements, OKRs, competitive analysis
- **🚀 onboarding/** - Employee onboarding guides, new hire checklists, role-specific onboarding
- **⚙️ operations/** - Operational procedures, maintenance guides, incident response plans, runbooks
- **📚 training/** - Training materials, tutorials, best practices, skill development resources

Each folder includes comprehensive README templates to guide you in creating your documentation. An example brand guide template is included to help you get started.

### Why Business Documentation?

- **AI Context**: Ensures AI tools understand your brand, processes, and business goals
- **Consistency**: Maintains brand and operational consistency across AI-generated content
- **Knowledge Base**: Centralizes business knowledge for team reference
- **Dashboard Integration**: Ready for hosting on the BIASED dashboard

### `biased updateKnowledge`
Convert business documentation in `biased/docs` into an AI-ready knowledge base in `biased/knowledge`. AI Agents and CI/CD pipelines will ignore the docs directory. Agent will reference files in the knowledge folder for context. This command is run automatically when you run `biased init`.

**Features:**
- Converts Word (.docx), PowerPoint (.pptx), PDF (.pdf), Excel (.xlsx), and Text files to Markdown
- Creates metadata placeholders for binary assets (images, etc.)
- Synchronizes changes (updates modified files, removes deleted ones)
- Generates a summary of your knowledge base

## Getting Started

After initializing BIASED in your project:

1. **Define Intent** - Start with `biased/intent/intent.md` to describe what your AI should accomplish
2. **Specify Behaviors** - Document expected behaviors in `biased/behavior/behavior-spec.md`
3. **Add Business Context** - Populate `biased/docs/` with your brand guidelines and processes
4. **Create Evaluations** - Add test cases to `biased/eval/eval-set.jsonl`
5. **Document Architecture** - Describe your AI system in `biased/architecture/architecture.md`

## Language Agnostic

BIASED works with **any** programming language or framework:
- JavaScript/TypeScript
- Python
- Java
- C#
- Go
- Ruby
- PHP
- And more...

The framework focuses on AI ceremonies and metrics, not code implementation.

## Integration with BIASED Dashboard

The BIASED framework is designed to integrate with the BIASED dashboard (coming soon), which will provide:
- Centralized documentation hosting
- Team collaboration features
- AI-powered insights
- Metrics visualization
- Governance tracking

## Philosophy

BIASED decouples AI ceremonies and metrics from implementation details. This means:
- ✅ Works with any language or tech stack
- ✅ Focuses on AI governance and evaluation
- ✅ Provides structure without being prescriptive
- ✅ Integrates with your existing workflow
- ✅ Scales from small projects to enterprise

## Commands

### `biased init`
Add the BIASED framework to your existing project in the current directory.

**Options:**
- `-n, --name <name>` - Project name (defaults to directory name)

### `biased validate`
Check if your project adheres to the BIASED framework structure. This command validates:
- Existence of the `biased/` directory
- Presence of critical files (Intent, Behavior, Eval, Governance)
- Validity of JSON configuration files

**Usage:**
```bash
biased validate
```

### `biased ci`
Generate a GitHub Actions workflow (`.github/workflows/biased-eval.yml`) to automate your BIASED evaluation pipeline. This workflow will:
- Run on push and pull requests
- Validate framework structure
- Run your project's tests

**Usage:**
```bash
biased ci
```

### `biased remove`
Remove the BIASED framework from your project. This will permanently delete the `biased/` directory and all its contents. You will be prompted for confirmation.

### `biased install-bdd`
Install BDD (Behavior-Driven Development) testing dependencies for your project. The command detects your project type and installs the appropriate tools:

- **Node.js**: Installs `@cucumber/cucumber`
- **Python**: Installs `behave`
- **.NET/C#**: Installs `SpecFlow`
- **Java**: Provides Maven/Gradle instructions for `cucumber-java`
- **Other**: Displays manual installation instructions

This is an opt-in command that encourages BDD practices without forcing dependencies.

## Contributing

PRs welcome! This tool is in active development.

## License

MIT

## Version

Current version: 0.3.0

### Changelog

**0.3.0** - BDD Support and Knowledge Auto-Generation
- Added `biased install-bdd` command for opt-in BDD tooling
- Auto-run `updateKnowledge` during `biased init`
- Multi-language BDD support (Node.js, Python, .NET, Java)

**0.2.3** - Knowledge Base Updates
- Added `biased updateKnowledge` command
- Support for converting Word, PowerPoint, PDF, Excel, and Text to Markdown
- Knowledge base synchronization

**0.2.0** - Framework-only approach
- Removed `biased new` command
- Removed language-specific templates
- Focus on adding BIASED framework to existing projects
- Added comprehensive business documentation structure
- Language-agnostic design

**0.1.x** - Initial release with project scaffolding
