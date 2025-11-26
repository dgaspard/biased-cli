<!--
AI AGENT METADATA:
@purpose: Define domain-specific terminology and BIASED framework concepts used throughout the project. Ensures consistent language between humans and AI agents.
@audience: Developers, AI agents, new team members
@format: Term-definition pairs in markdown list format. Each term in **bold**, followed by definition.
@required_sections: BIASED framework terms, domain-specific terms
@related_files:
  - biased/intent/intent.md (uses terms defined here)
  - biased/behavior/behavior-spec.md (references domain concepts)
  - All BIASED documentation
@update_frequency: Add terms when introduced, review monthly
@instructions: AI agents should reference this glossary when interpreting requirements or generating code. Use defined terms consistently. If a term is ambiguous, add it to this glossary with a clear definition.
@format_rules: 
  - One term per bullet point
  - Term in **bold** followed by colon
  - Definition should be concise (1-2 sentences)
  - Include examples for complex terms
-->

# Glossary

## BIASED Framework Terms

- **Intent**: What outcome matters to people; includes purpose, desired outcomes, and constraints. Defined in `biased/intent/intent.md`.
- **Behavior**: Observable AI model responses that satisfy the defined intent. Specified in `biased/behavior/behavior-spec.md`.
- **Evaluation set**: Repeatable test cases aligned to intent success metrics. Stored in `biased/eval/eval-set.jsonl`.
- **Drift**: Changes in AI behavior over time as data, models, or environment change. Tracked in `biased/eval/drift-history.csv`.
- **Governance**: Policies and risk management for AI systems. Documented in `biased/governance/governance-card.md`.
- **Adoption**: Metrics tracking how users engage with the AI system. Measured in `biased/adoption/adoption-metrics.md`.

## Domain-Specific Terms

[Add your project-specific terminology here. Example:]

- **Adjuster**: Insurance professional who evaluates claims to determine coverage and settlement amounts.
- **Risk clause**: Legal or contractual provision that may expose the insurance company to financial liability.
- **Hallucination**: When an AI model generates information not supported by input data or training. Critical to measure and minimize.

---

**AI Agent Instructions:**
- Always use terms as defined in this glossary
- When encountering an undefined term, ask for clarification or add it here
- Use this glossary to interpret domain-specific requests
- Ensure generated code and documentation use consistent terminology
