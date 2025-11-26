<!--
AI AGENT METADATA:
@purpose: Define specific, observable behaviors that an AI system must exhibit to satisfy the intent. This translates high-level outcomes into testable specifications.
@audience: Developers, AI agents, QA engineers
@format: Structured sections (Expected behaviors, Unacceptable behaviors, Deterministic rules, Acceptance thresholds)
@required_sections: Expected behaviors, Unacceptable behaviors, Deterministic rules (if any), Acceptance thresholds
@related_files:
  - biased/intent/intent.md (source of truth for what behaviors should achieve)
  - biased/eval/eval-set.jsonl (tests that validate these behaviors)
  - biased/behavior/edge-cases.md (special cases to handle)
  - biased/architecture/architecture.md (technical constraints)
@update_frequency: Update when behavior requirements change or new edge cases discovered
@instructions: AI agents should use this to generate code that exhibits expected behaviors and avoids unacceptable ones. Every behavior should be verifiable through evaluation tests. When writing code, reference this file to ensure compliance.
@validation: Each expected behavior should have at least one test case in eval-set.jsonl. Acceptance thresholds must have corresponding metrics in biased/metrics/.
@test_driven: All behaviors must be testable and measured against thresholds
-->

# Behavior Specification

**Derived from**: `biased/intent/intent.md`

## Expected behaviors

[List specific, observable behaviors the AI system must exhibit. Each should be testable.]

Example:
1. Summaries include: claim type, key events, amounts, timeframes.
2. Risk clauses are **extracted verbatim** or paraphrased with citation.
3. Tone is neutral; no blame language.
4. When confidence < 0.7, response includes: "I'm not fully sure because ..."

## Unacceptable behaviors

[Behaviors the system must NOT exhibit. These define failure modes.]

Example:
- Inventing policy text or events.
- Omitting risk clauses present in the PDF.
- Using speculative/accusatory language.
- Exceeding 400 words unless user requests detail.

## Deterministic rules

[Hard constraints that must ALWAYS be followed, regardless of model output.]

Example:
- Always output a JSON footer with:
  `{ "confidence": number, "risk_clauses": string[], "sources": string[] }`

## Acceptance thresholds

[Quantitative criteria for each behavior. Must align with success metrics in intent.md.]

Example:
- Behavior accuracy ≥ 0.9 on eval set
- Consistency score ≥ 0.85 across paraphrase variants
- Hallucination/error rate ≤ 0.03

---

**AI Agent Instructions:**
- Every expected behavior should map to at least one test case in `biased/eval/eval-set.jsonl`
- When generating code, ensure it can satisfy acceptance thresholds
- Validate outputs against deterministic rules before returning
- Use edge cases from `biased/behavior/edge-cases.md` to inform robust implementation
- If a behavior cannot be achieved, document why and propose alternatives

Last updated: {{DATE}}
