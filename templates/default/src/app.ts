import { summarizeClaim } from "./ai/prompt.js";

const sampleInput = "Claim PDF text: ...";
const result = await summarizeClaim(sampleInput);
console.log(result);
