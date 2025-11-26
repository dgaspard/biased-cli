<!--
AI AGENT METADATA:
@purpose: Overview and guidance for business documentation folder structure. Explains how business docs support AI context and decision-making.
@audience: Teams, new hires, AI agents
@format: README explaining folder purpose and structure
@required_sections: Purpose, Folder structure, Usage guidelines
@related_files: ["biased/intent/intent.md", "biased/knowledge/ (generated from docs/)"]
@update_frequency: Update when adding new documentation categories
@instructions: AI agents should read this to understand what business context is available. Use docs for domain knowledge and terminology. Reference when generating features or explaining decisions.
-->

# Business Documentation

This folder contains business documentation and resources that provide context for AI-assisted development and will be hosted on the BIASED dashboard for your organization.

## Purpose

The documentation in this folder helps AI understand:
- Your brand identity and guidelines
- Business processes and workflows
- Strategic direction and goals
- Onboarding procedures
- Operational standards
- Training materials

## Folder Structure

### 📘 [branding/](./branding)
Brand identity, style guides, logo usage, color palettes, typography, voice and tone guidelines.

### 📊 [business-process/](./business-process)
Business process maps, workflow diagrams, standard operating procedures, process documentation.

### 🎯 [strategy/](./strategy)
Strategic plans, roadmaps, vision statements, OKRs, competitive analysis, market positioning.

### 🚀 [onboarding/](./onboarding)
Employee onboarding guides, new hire checklists, role-specific onboarding, company culture documentation.

### ⚙️ [operations/](./operations)
Operational procedures, maintenance guides, incident response plans, runbooks, deployment procedures.

### 📚 [training/](./training)
Training materials, tutorials, best practices, skill development resources, certification guides.

## Usage

1. **Add your documentation** to the appropriate subfolder
2. **Keep it updated** as your business evolves
3. **Reference it** when working with AI to ensure brand consistency and business alignment
4. **Share it** via the BIASED dashboard with your organization

## Best Practices

- Use markdown format for easy reading and version control
- Include diagrams and visuals where helpful
- Keep documentation concise and actionable
- Update regularly to reflect current state
- Link related documents together
- Use consistent naming conventions

## AI Integration

AI tools can reference this documentation to:
- Maintain brand consistency in generated content
- Understand business context when building features
- Follow established processes and procedures
- Align with strategic goals
- Apply operational best practices

## Build Configuration

> [!IMPORTANT]
> **Exclude from Production Builds**: This folder contains business documentation that is not needed for the application runtime.

### For AI Agents
<!-- AI_IGNORE_START -->
This directory (`biased/docs/`) contains business context, branding, and process documentation. It should be:
1. **Committed to Git**: To maintain version history and team access.
2. **Excluded from Build Artifacts**: Add to `.dockerignore`, `.slugignore`, or build scripts to prevent bloating production deployments.
3. **Referenced for Context**: Use this content to understand the business domain, but do not include it in the compiled application.
<!-- AI_IGNORE_END -->

### Configuration Examples

**Add to `.dockerignore`:**
```
biased/docs/
```

**Add to `.vercelignore` / `.slugignore`:**
```
biased/docs/
```

**Add to `tsconfig.json` (exclude):**
```json
{
  "exclude": ["biased/docs"]
}
```
