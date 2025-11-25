import fs from "node:fs/promises";
import path from "node:path";
import { summarizeClaim } from "./prompt.js";

export async function runEvalSet() {
  const evalPath = path.join(process.cwd(), "biased/eval/eval-set.jsonl");
  const lines = (await fs.readFile(evalPath, "utf8")).trim().split(/\r?\n/);
  let pass = 0;

  for (const line of lines) {
    const test = JSON.parse(line);
    const out = await summarizeClaim(test.input);

    const okContains = (test.expected_summary_contains ?? []).every((s: string) =>
      out.summary.toLowerCase().includes(String(s).toLowerCase())
    );

    const okRisk = (test.expected_risk_clauses ?? []).every((s: string) =>
      out.risk_clauses.join(" ").toLowerCase().includes(String(s).toLowerCase())
    );

    const okUnc = test.expected_uncertainty ? out.summary.toLowerCase().includes("not fully sure") : true;

    const ok = okContains && okRisk && okUnc;
    if (ok) pass += 1;
    console.log(`${test.id}: ${ok ? "PASS" : "FAIL"}`);
  }

  const passRate = pass / lines.length;
  return { passRate, total: lines.length, pass };
}
