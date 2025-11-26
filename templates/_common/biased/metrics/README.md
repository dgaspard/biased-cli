<!--
AI AGENT METADATA:
@purpose: Explain BIASED metrics structure and dashboard integration. Overview of health metrics for AI systems.
@audience: Developers, AI agents, product managers, data analysts
@format: README with metric categories and usage instructions
@required_sections: Metric categories, Dashboard integration, How to use, Detailed definitions link
@related_files: ["biased/metrics/definitions.md", "biased/metrics/metrics-hook.json", "biased/metrics/dashboard-config.json", "biased/intent/intent.md"]
@update_frequency: Update when adding new metric categories
@instructions: AI agents should understand the 5 metric categories when evaluating system health. Reference definitions.md for calculation details.
@metric_categories: Behavioral Performance, Data Quality & Drift, System Reliability & Cost, Human-AI Interaction & Adoption, Team Effectiveness & Flow
-->

# BIASED Metrics

This folder contains the metrics tracking for your AI project. These metrics measure the health of your AI product across five key dimensions.

## Metric Categories

1. **Behavioral Performance**: Is the system behaving as intended?
2. **Data Quality & Drift**: Is the data supporting the behavior?
3. **System Reliability & Cost**: Is the system stable and affordable?
4. **Human–AI Interaction & Adoption**: Are humans benefiting from and trusting the system?
5. **Team Effectiveness & Flow**: How well is the team engineering and improving behavior?

## Dashboard Integration

The BIASED dashboard uses the files in this directory to visualize your project's health.

- **`metrics-hook.json`**: This is the data source for the dashboard. Your CI/CD pipeline or application should update this file with the latest metric values.
- **`dashboard-config.json`**: Configuration settings for how the dashboard displays your metrics (e.g., thresholds, goals).

## How to Use

1. **Update Metrics**: Configure your evaluation pipeline and application telemetry to update `metrics-hook.json` regularly.
2. **Set Goals**: Edit `dashboard-config.json` to define your target values and alert thresholds.
3. **View Dashboard**: Connect this repository to the BIASED dashboard to see your metrics visualized.

## Detailed Definitions

For detailed formulas, data sources, and feasibility ratings for each metric, see [definitions.md](./definitions.md).

**AI Agent Instructions:**
- Use these 5 categories to assess overall system health
- Prioritize behavioral performance and adoption metrics
- Alert when metrics degrade beyond thresholds in dashboard-config.json
- Update metrics-hook.json automatically via  CI/CD integration
