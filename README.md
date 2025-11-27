# biased-cli

**BIASED CLI** - The standard for AI-ready software engineering.

## What is BIASED?

BIASED is a **governance-first framework** designed to bridge the gap between traditional software engineering and AI engineering. It provides a standardized structure for building, testing, and monitoring AI systems, ensuring they are:

- **Intentional**: Clearly defined goals and boundaries
- **Reliable**: Tested behaviors and edge cases
- **Observable**: Built-in metrics and drift detection
- **Compliant**: Governance and risk management from day one

The framework is **language-agnostic** and works with any tech stack (Node.js, Python, Java, .NET, etc.). It doesn't replace your code; it wraps it in a layer of professional engineering practices.

### The BIASED Acronym

- **B**ehavior: What should the AI do? (Specs, BDD tests)
- **I**ntent: Why are we building this? (Goals, non-goals)
- **A**rchitecture: How is it built? (RAG flow, system design)
- **S**trategy: How does it fit the business? (Roadmap, KPIs)
- **E**valuation: How do we know it works? (Eval sets, metrics)
- **D**ocumentation: What does the AI need to know? (Context, branding)

## Quick Start

You don't need to install anything. Run the CLI directly with `npx`:

```bash
npx biased-cli init
```

This creates a `biased/` folder in your current directory with the complete framework structure.

## Commands

All commands can be run using `npx biased-cli <command>` (no installation required) or `biased <command>` (if installed globally).

### `init`
Initializes the BIASED framework in your project.

```bash
npx biased-cli init
# OR
npx biased-cli init --name "My Project"
```

- Creates the `biased/` directory structure
- Generates template files (Intent, Behavior, Governance, etc.)
- Auto-runs `update-knowledge` to process documentation
- Auto-runs `ci` to set up GitHub Actions

### `validate`
Validates that your project adheres to the BIASED framework standards.

```bash
npx biased-cli validate
```

- Checks for required files and directories
- Validates JSON configuration syntax
- Ensures governance artifacts are present
- Useful for CI/CD pipelines to enforce standards

### `update-knowledge`
Converts your business documentation into an AI-optimized knowledge base.

```bash
npx biased-cli update-knowledge
```

- Reads from `biased/docs/` (Word, PDF, Excel, PPTX, Text)
- Converts everything to Markdown in `biased/knowledge/`
- Updates the knowledge base summary
- **Note**: AI agents should read from `biased/knowledge/`, not `biased/docs/`.

### `install-bdd`
Sets up Behavior-Driven Development (BDD) testing for your specific language.

```bash
npx biased-cli install-bdd
```

- Detects your project language (Node.js, Python, C#, Java)
- Installs appropriate BDD tools (Cucumber, Behave, SpecFlow)
- Configures test runners
- Creates sample feature files

### `ci`
Generates a GitHub Actions workflow for continuous evaluation.

```bash
npx biased-cli ci
```

- Creates `.github/workflows/biased-eval.yml`
- Configures automated validation on Pull Requests
- Sets up a baseline for AI evaluation pipelines

### `remove`
Removes the BIASED framework from your project.

```bash
npx biased-cli remove
```

- Deletes the `biased/` directory
- Removes all framework artifacts
- **Warning**: This action is irreversible.

## Framework Structure

After initialization, your project will have:

```
your-project/
├── biased/
│   ├── intent/              # Why: Intent statements, glossary
│   ├── behavior/            # What: Behavior specs, edge cases
│   ├── architecture/        # How: System design, RAG plans
│   ├── eval/                # Testing: Eval sets, drift history
│   ├── governance/          # Safety: Risk register, governance cards
│   ├── adoption/            # Usage: Metrics, workflow maps
│   ├── docs/                # Context: Source business docs (Office/PDF)
│   ├── knowledge/           # AI Memory: Auto-converted docs for Agents
│   ├── configuration/       # Config: App properties
│   └── metrics/             # Data: Weekly metrics tracking
└── [your code]
```

## Business Documentation & AI Context

The `biased/docs/` folder is where you drop your existing business documents. The CLI automatically processes these into `biased/knowledge/` for AI consumption.

1. **Place files in `biased/docs/`** (Brand guides, SOPs, Strategy decks)
2. **Run `npx biased-cli update-knowledge`**
3. **AI Agents read `biased/knowledge/`** to understand your business context

## Contributing

PRs are welcome! This tool is in active development.

## License

MIT


## Version

Current version: 0.4.0

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
