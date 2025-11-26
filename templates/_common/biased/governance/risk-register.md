<!--
AI AGENT METADATA:
@purpose: Ongoing registry of identified risks and their mitigation status. Tracks risks throughout project lifecycle.
@audience: Risk managers, compliance teams, AI agents, developers
@format: Markdown table with columns: Date, Risk, Likelihood, Impact, Owner, Mitigation, Status
@required_columns: Date, Risk, Likelihood (High/Medium/Low), Impact (High/Medium/Low), Owner, Mitigation, Status (Open/Mitigated/Accepted)
@related_files:
  - biased/governance/governance-card.md (risks from change reviews)
  - biased/intent/intent.md (constraints limit acceptable risks)
@update_frequency: Add risks as discovered, review weekly/monthly
@instructions: AI agents should add new rows when identifying risks during development. Prioritize High likelihood + High impact risks. Suggest specific mitigations.
@severity_levels: Critical (H/H), High (H/M or M/H), Medium (M/M), Low (L/L or L/M or M/L)
-->

# Risk Register

| Date | Risk | Likelihood | Impact | Owner | Mitigation | Status |
|---|---|---|---|---|---|---|
| YYYY-MM-DD | Example: Model hallucinates facts | High | High | AI Team | Add fact-checking layer, expand eval set | Open |

**AI Agent Instructions:**
- Add new risks when discovered during development or testing
- Likelihood: High (>30%), Medium (10-30%), Low (<10%)
- Impact: High (critical failure), Medium (degraded UX), Low (minor issue)
- Status: Open (needs mitigation), Mitigated (addressed), Accepted (documented, not fixing)
- Prioritize High likelihood + High impact combinations
