# biased (CLI)

This is the seed for the **BIASED** operating model in code form.  
Run:

```bash
npx biased init
```

It scaffolds a repo with:
- **Intent statements** in `biased/intent/`
- **Behavior specs** in `biased/behavior/`
- **Evaluation sets & drift history** in `biased/eval/`
- **Governance cards** in `biased/governance/`
- **Adoption & UX artifacts** in `biased/adoption/`
- Example app code and a tiny evaluable AI workflow.

## What you get after init

```
.
├─ biased/
│  ├─ intent/
│  │  ├─ intent.md
│  │  └─ glossary.md
│  ├─ behavior/
│  │  ├─ behavior-spec.md
│  │  └─ edge-cases.md
│  ├─ eval/
│  │  ├─ eval-set.jsonl
│  │  ├─ eval-config.json
│  │  └─ drift-history.csv
│  ├─ architecture/
│  │  ├─ architecture.md
│  │  └─ rag-plan.md
│  ├─ governance/
│  │  ├─ governance-card.md
│  │  └─ risk-register.md
│  ├─ adoption/
│  │  ├─ adoption-metrics.md
│  │  └─ workflow-map.md
│  └─ metrics/
│     └─ weekly-metrics.json
├─ features/
│  └─ summarize_pdf.feature
├─ src/
│  ├─ app.ts
│  ├─ ai/
│  │  ├─ prompt.ts
│  │  └─ evaluator.ts
│  └─ metrics.ts
├─ package.json
└─ README.md
```

## Scripts

- `npm run biased:validate` – checks required BIASED artifacts exist and basic schema is valid.
- `npm run biased:eval` – runs evaluation set against your `src/ai/prompt.ts`.
- `npm run biased:metrics` – prints weekly metrics derived from eval + drift files.

> The initial versions are intentionally simple. Replace with your real model, RAG stack, and telemetry.

## Contributing

PRs welcome. This tool is in early alpha.
