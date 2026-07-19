import { getEmbeddingProvider } from "./index.js";

const provider = getEmbeddingProvider();

const vector = await provider.embed("Hello World");

console.log(vector.length);