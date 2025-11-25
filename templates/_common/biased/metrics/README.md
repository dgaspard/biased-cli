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
