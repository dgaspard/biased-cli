# Behavior Specification

Derived from: `biased/intent/intent.md`

## Expected behaviors
1. Summaries include: claim type, key events, amounts, timeframes.
2. Risk clauses are **extracted verbatim** or paraphrased with citation.
3. Tone is neutral; no blame language.
4. When confidence < 0.7, response includes: "I'm not fully sure because ..."

## Unacceptable behaviors
- Inventing policy text or events.
- Omitting risk clauses present in the PDF.
- Using speculative/accusatory language.
- Exceeding 400 words unless user requests detail.

## Deterministic rules
- Always output a JSON footer with:
  `{ "confidence": number, "risk_clauses": string[], "sources": string[] }`

## Acceptance thresholds
- Behavior accuracy ≥ 0.9 on eval set
- Consistency score ≥ 0.85 across paraphrase variants
- Hallucination/error rate ≤ 0.03

Last updated: 2025-11-24
