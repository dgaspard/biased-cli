<!--
AI AGENT METADATA:
@purpose: Define the high-level intent and desired outcomes for an AI system. This is the "why" that drives all behavior specifications, evaluations, and architecture decisions.
@audience: Developers, AI agents, product managers, stakeholders
@format: Structured template with required sections (Purpose, Outcomes, Constraints, Success Metrics)
@required_sections: Purpose, Primary outcomes, Constraints/non-goals, Users/stakeholders, Success metrics, Data sources
@related_files: 
  - biased/behavior/behavior-spec.md (behaviors that satisfy this intent)
  - biased/eval/eval-set.jsonl (tests aligned to success metrics)
  - biased/architecture/architecture.md (technical decisions supporting intent)
  - biased/glossary.md (defines domain terminology)
@update_frequency: Update when project goals change, review quarterly
@instructions: AI agents should use this file to understand project goals before generating code, writing tests, or making architecture recommendations. Every behavior and evaluation should trace back to an outcome or metric defined here.
@validation: Ensure all success metrics are measurable and have target values. Every constraint should be testable.
-->

# Intent Statement: {{PROJECT_NAME}}

**Purpose (human outcome)**  
[Describe the real-world problem this AI system solves and who it helps. Focus on human value, not technical features.]

Example: Adjusters need to review claim PDFs quickly without missing risk, fraud, or compliance issues.

**Primary outcomes**
[List 2-5 specific, measurable outcomes the system must deliver. Use action verbs.]

Example:
- Provide a **neutral, concise summary** of a claim PDF in under 30 seconds.
- Highlight any **financial risk clauses** and **fraud indicators**.
- Express uncertainty explicitly when the document is ambiguous.

**Constraints / non-goals**
[What the system should NOT do. Define boundaries and ethical constraints.]

Example:
- Do **not** invent facts not present in the PDF.
- Do **not** provide legal advice.
- Use only approved internal policy sources for definitions.

**Users / stakeholders**
[Who will use this system or be affected by it?]

Example:
- Primary: Claims adjusters
- Secondary: Risk & Compliance reviewers

**Success metrics (targets)**
[Quantifiable metrics with specific target values. These drive evaluation sets.]

Example:
- Hallucination rate < 3% on weekly eval set
- Risk clause recall ≥ 95%
- Adjuster adoption rate ≥ 70% within 8 weeks

**Data sources**
[What data the AI system will consume. List file paths relative to project root.]

Example:
- `policies/claims_policy_v3.pdf`
- `knowledge/risk_clauses.md`
- Example claim PDFs in `data/claims/`

---

**AI Agent Instructions:**
- Use this intent to validate all code changes and feature additions
- Ensure behavior specs in `biased/behavior/` align with these outcomes
- Generate evaluation tests that measure these success metrics
- Reject features that violate stated constraints
- Reference this intent when explaining design decisions

Last updated: {{DATE}}
