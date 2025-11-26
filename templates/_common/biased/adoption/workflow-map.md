<!--
AI AGENT METADATA:
@purpose: Document the human-AI interaction workflow. Shows how users and AI collaborate to complete tasks.
@audience: UX designers, AI agents, product managers, developers
@format: Numbered workflow steps showing user actions and system responses
@required_sections: Workflow steps
@related_files: ["biased/behavior/behavior-spec.md (AI responses)", "biased/adoption/adoption-metrics.md (measure workflow effectiveness)", "biased/intent/intent.md (user outcomes)"]
@update_frequency: Update when behaviors or UI change
@instructions: AI agents should understand this workflow to provide appropriate responses at each step. Use this to identify where assistance is most valuable.
@notation: Use numbered steps, clearly distinguish user actions from system responses
-->

# Human–AI Workflow Map

## Primary Workflow

1. **User**: Adjuster uploads PDF claim document
2. **AI System**: Returns summary + risk clauses within 30 seconds
3. **User**: Reviews output, accepts or edits
4. **AI System**: Logs override and confidence for learning
5. **User**: Proceeds with claim decision

## Alternative Flows

- **Uncertainty case**: If AI confidence < 0.7, user manually reviews with warnings
- **Error case**: If processing fails, user receives clear error message with fallback

**AI Agent Instructions:**
- Design features that fit naturally into this workflow
- Minimize interruptions to user tasks
- Log interactions to improve adoption metrics
- Update this map when UI or behaviors change

Last updated: {{DATE}}
