<!--
AI AGENT METADATA:
@purpose: Guides for responding to incidents and system failures.
@audience: On-call engineers, AI agents
@format: Incident response guides (Symptoms, Diagnosis, Remediation)
@required_sections: Incident Name, Symptoms, Diagnosis Steps, Remediation Steps
@related_files: ["biased/metrics/metrics-hook.json", "biased/docs/operations/sops.md"]
@update_frequency: After post-mortems
@instructions: AI agents should reference this when diagnosing system alerts. Match symptoms to runbooks to suggest remediation steps.
-->

# Runbooks

## RB-001: High Hallucination Rate Alert

**Symptoms**:
- `hallucinationRate` metric > 0.05 (5%)
- User feedback indicates "made up" facts.

**Diagnosis**:
1. Check `eval/drift-history.csv` for recent trends.
2. Review recent `governance/governance-card.md` for model or prompt changes.
3. Inspect `knowledge/` retrieval logs for low relevance scores.

**Remediation**:
1. **IF** caused by new model: Rollback to previous model version.
2. **IF** caused by data drift: Update `knowledge/` index.
3. **IF** unknown: Lower model temperature to 0.1 and notify AI Lead.
