import { z } from "zod";

const OutputSchema = z.object({
  summary: z.string(),
  confidence: z.number().min(0).max(1),
  risk_clauses: z.array(z.string()),
  sources: z.array(z.string())
});

export type SummaryOutput = z.infer<typeof OutputSchema>;

/**
 * Replace this stub with your RAG/LLM call.
 */
export async function summarizeClaim(input: string): Promise<SummaryOutput> {
  const fake = {
    summary: "Neutral summary placeholder. Mentions payout cap and uncertainty when relevant.",
    confidence: 0.8,
    risk_clauses: ["cap at $10,000"],
    sources: ["policies/claims_policy_v3.pdf"]
  };
  return OutputSchema.parse(fake);
}
