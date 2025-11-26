<!--
AI AGENT METADATA:
@purpose: Document architecture decisions and technical design for the AI system. Records why specific technical choices were made to support intent and behaviors.
@audience: Developers, AI agents, architects, system designers
@format: Architecture Decision Record (ADR) style or free-form technical notes
@required_sections: Prompting strategy, Retrieval sources (if RAG), Safety layers, Technical constraints
@related_files:
  - biased/intent/intent.md (technical decisions must support intent)
  - biased/behavior/behavior-spec.md (architecture enables behaviors)
  - biased/architecture/rag-plan.md (detailed RAG configuration)
  - biased/configuration/app.properties.template (runtime config)
@update_frequency: Update during architecture reviews or major technical changes
@instructions: AI agents should consult this before making architectural proposals or code changes. Use this to understand technical constraints and patterns. When suggesting changes, ensure they align with documented decisions.
@decision_format: Context → Decision → Consequences (ADR pattern recommended)
-->

# Architecture & Behavior Design Notes

## Prompting Strategy

[Describe how prompts are structured to elicit desired behaviors.]

Example: RAG + structured output

## Retrieval Sources

[If using RAG, list knowledge sources and how they're accessed.]

Example:
- Internal policy docs (`policies/*`)
- Claim knowledge base (`knowledge/*`)

## Safety Layers

[Security and safety mechanisms to protect users and data.]

Example:
- PII redaction before LLM processing
- Policy guardrails to prevent harmful outputs

## Technical Constraints

[Infrastructure, latency, cost, or other technical limitations.]

Example:
- Response time must be < 5 seconds
- Maximum context window: 8192 tokens
- Cost budget: $0.03 per request

## Integration Points

[How this AI system connects to other services or data sources.]

Example:
- Policy database (PostgreSQL)
- Document storage (S3)
- Logging service (DataDog)

---

**AI Agent Instructions:**
- Before proposing architectural changes, review existing decisions here
- Document new technical decisions using ADR format: Context → Decision → Consequences
- Ensure architectural choices support behaviors defined in `biased/behavior/behavior-spec.md`
- Consider RAG plan details in `biased/architecture/rag-plan.md` for retrieval decisions
- Update this file during architecture reviews (see: intent.md for review frequency)

**Review Frequency**: During Architecture & Behavior Design Review (as defined in project ceremonies)

Last updated: {{DATE}}
