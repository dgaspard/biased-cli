<!--
AI AGENT METADATA:
@purpose: Track safety and governance reviews for AI system changes. Ensures risks are identified and mitigated before deployment.
@audience: Developers, AI agents, compliance teams, risk managers
@format: Structured card with Change, Risks, Mitigations, and Release decision
@required_sections: Change description, Data sources, Risks, Mitigations, Release decision
@related_files:
  - biased/governance/risk-register.md (ongoing risk tracking)
  - biased/intent/intent.md (constraints define acceptable risks)
  - biased/eval/eval-set.jsonl (tests mitigate risks)
@update_frequency: Create new card for each significant change
@instructions: AI agents should create a governance card before making changes that affect behavior, data sources, or models. Use risk categories to ensure comprehensive review.
@risk_categories: Hallucination, Bias/Fairness, Privacy/PII, Compliance, Performance degradation
@approval_required: Changes must be approved before production deployment
-->

# Safety & Governance Card

**Change**
- Describe change here (prompt tweak, new data source, model swap).

**Data sources involved**
- List sources.

**Risks**
- Hallucination increase?
- Bias/ fairness concern?
- Compliance violation?

**Mitigations**
- Eval set expansion
- Lower temp / stricter JSON schema
- Blocklist / allowlist

**Release decision**
- ☐ Approved  ☐ Blocked
- Notes:

**AI Agent Instructions:**
- Create a new card for each significant system change
- Systematically evaluate risks across all categories
- Propose specific, measurable mitigations
- Do not deploy changes marked as Blocked
- Link to related eval tests that validate mitigations

Last updated: {{DATE}}
