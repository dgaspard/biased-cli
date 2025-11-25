# Intent Statement: PDF Risk Summarizer

**Purpose (human outcome)**  
Adjusters need to review claim PDFs quickly without missing risk, fraud, or compliance issues.

**Primary outcomes**
- Provide a **neutral, concise summary** of a claim PDF in under 30 seconds.
- Highlight any **financial risk clauses** and **fraud indicators**.
- Express uncertainty explicitly when the document is ambiguous.

**Constraints / non-goals**
- Do **not** invent facts not present in the PDF.
- Do **not** provide legal advice.
- Use only approved internal policy sources for definitions.

**Users / stakeholders**
- Primary: Claims adjusters
- Secondary: Risk & Compliance reviewers

**Success metrics (targets)**
- Hallucination rate < 3% on weekly eval set
- Risk clause recall ≥ 95%
- Adjuster adoption rate ≥ 70% within 8 weeks

**Data sources**
- `policies/claims_policy_v3.pdf`
- `knowledge/risk_clauses.md`
- Example claim PDFs in `data/claims/`

Last updated: 2025-11-24
