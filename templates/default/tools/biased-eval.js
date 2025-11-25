import { runEvalSet } from "../src/ai/evaluator.js";

const { passRate, pass, total } = await runEvalSet();
console.log(`\nEval pass rate: ${(passRate * 100).toFixed(1)}% (${pass}/${total})`);
process.exit(passRate >= 0.9 ? 0 : 2);
