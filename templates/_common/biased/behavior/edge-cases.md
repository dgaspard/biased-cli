<!--
AI AGENT METADATA:
@purpose: Document edge cases and boundary conditions that must be handled by the AI system. These inform robust testing and error handling.
@audience: Developers, AI agents, QA engineers
@format: Numbered list of edge case scenarios. Each should describe a challenging or unusual input.
@required_sections: Edge case scenarios (can be categorized by type)
@related_files:
  - biased/behavior/behavior-spec.md (behaviors must handle these cases)
  - biased/eval/eval-set.jsonl (should include tests for each edge case)
  - biased/intent/intent.md (constraints define acceptable handling)
@update_frequency: Add cases as they are discovered, review monthly
@instructions: AI agents should generate test cases for each edge case and ensure the system handles them gracefully. When implementing features, consider these scenarios. Add new edge cases when bugs or unexpected inputs are found.
@priority_levels: HIGH (must handle), MEDIUM (should handle), LOW (nice to have)
@test_coverage: Each edge case should have at least one eval test
-->

# Edge Cases to Test

[List unusual, challenging, or boundary condition scenarios the system must handle. Group by category if helpful.]

## Data Quality Issues

Example:
1. **[HIGH]** PDF is scanned image; OCR errors present
2. **[MEDIUM]** Multiple claims combined in one PDF
3. **[HIGH]** Conflicting amounts in different sections

## Missing/Incomplete Data

Example:
4. **[HIGH]** Missing signatures / dates
5. **[MEDIUM]** Very long appendices with irrelevant text

## Language \& Format Variations

Example:
6. **[LOW]** Non-English clauses

---

**AI Agent Instructions:**
- Create at least one test case in `biased/eval/eval-set.jsonl` for each HIGH priority edge case
- Design error handling that gracefully manages these scenarios
- When encountering a new edge case in production, add it to this list
- Prioritize edge cases based on likelihood and impact:
  - HIGH: Common or critical impact
  - MEDIUM: Occasional or moderate impact  
  - LOW: Rare or minor impact
- Document how each edge case should be handled in `biased/behavior/behavior-spec.md`
