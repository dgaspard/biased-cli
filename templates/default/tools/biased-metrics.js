import fs from "node:fs/promises";
import path from "node:path";
import { computeWeeklyMetrics } from "../src/metrics.js";

const metrics = await computeWeeklyMetrics();
const outPath = path.join(process.cwd(), "biased/metrics/weekly-metrics.json");
const prior = JSON.parse(await fs.readFile(outPath, "utf8"));

const next = { ...prior, ...metrics };
await fs.writeFile(outPath, JSON.stringify(next, null, 2));
console.log(next);
