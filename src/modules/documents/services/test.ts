import { processDocument } from "./process.js";

const DOCUMENT_ID = "b479c4aa-1baa-49c2-8699-bf9df7d3e23b";
const parsed = await processDocument(DOCUMENT_ID);

console.log(parsed);