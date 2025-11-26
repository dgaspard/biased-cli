<!--
AI AGENT METADATA:
@purpose: Document Standard Operating Procedures (SOPs) with clear logic flows.
@audience: Operations teams, AI agents
@format: Step-by-step procedures with logic branches
@required_sections: Procedure Name, Trigger, Steps (If/Then logic)
@related_files: ["biased/adoption/workflow-map.md", "biased/docs/operations/runbooks.md"]
@update_frequency: As processes change
@instructions: AI agents should extract logic flows from this document. Look for "If X, then Y" patterns to understand decision-making logic.
-->

# Standard Operating Procedures (SOPs)

## SOP-001: Claim Validation

**Trigger**: New claim submitted via portal.

**Steps**:
1. Check if policy is active.
   - **IF** active: Proceed to step 2.
   - **IF** inactive: Reject claim (Code: POL_INACTIVE).
2. Verify claim amount.
   - **IF** amount > $10,000: Route to Senior Adjuster.
   - **IF** amount <= $10,000: Route to Auto-Processing.
3. Check for fraud flags.
   - **IF** flags present: Route to SIU (Special Investigations Unit).
