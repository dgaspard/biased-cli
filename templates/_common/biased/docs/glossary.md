<!--
AI AGENT METADATA:
@purpose: The "Rosetta Stone" for the project. Maps business terms to code and database representations.
@audience: Developers, AI agents, stakeholders
@format: Table mapping Business Term -> Definition -> Code/DB Aliases
@required_sections: Term, Definition, Synonyms, Code Reference, DB Column
@related_files: ["biased/intent/glossary.md (high-level definitions)", "biased/docs/branding/prohibited-terms.md"]
@update_frequency: When new terms are introduced or schema changes
@instructions: AI agents MUST use this file to resolve ambiguity. If a user says "Client", map it to "User" or "customer_id" based on this table.
-->

# Project Glossary (Rosetta Stone)

| Business Term | Definition | Code Reference | Database Column | Synonyms |
|---|---|---|---|---|
| **Client** | The individual purchasing the insurance policy. | `User`, `Customer` | `users.id`, `customers.client_id` | Policyholder, Insured |
| **Claim** | A formal request for coverage or compensation. | `ClaimRequest` | `claims.claim_uuid` | Case, Ticket |
| **Adjuster** | The employee reviewing the claim. | `AdminUser` | `admins.id` | Reviewer, Staff |
| **Premium** | The amount paid for the policy. | `Policy.cost` | `policies.premium_amount_cents` | Price, Rate |

**AI Agent Instructions:**
- Use this table to translate natural language queries into code/SQL.
- Example: "Show me all Clients" -> `SELECT * FROM users;`
- Example: "Find Claims for this Policyholder" -> `SELECT * FROM claims WHERE client_id = ...`
