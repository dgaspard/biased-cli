import { runEvalSet } from "./ai/evaluator.js";

/**
 * Very simple "weekly metrics" snapshot.
 * In real projects, derive from telemetry + drift.
 */
export async function computeWeeklyMetrics() {
  const { passRate } = await runEvalSet();
  return {
    behavior_accuracy: passRate,
    hallucination_rate: 0.0, // stub - compute from eval labeling
    drift_score: 0.0,        // stub - compute from drift-history.csv
  };
}
