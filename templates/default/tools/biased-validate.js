import fs from "node:fs";
import path from "node:path";

const required = [
  "biased/intent/intent.md",
  "biased/behavior/behavior-spec.md",
  "biased/eval/eval-set.jsonl",
  "biased/governance/governance-card.md",
  "biased/adoption/adoption-metrics.md"
];

let ok = true;
for (const f of required) {
  const full = path.join(process.cwd(), f);
  if (!fs.existsSync(full)) {
    console.error(`Missing required artifact: ${f}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log("BIASED artifacts look good.");
