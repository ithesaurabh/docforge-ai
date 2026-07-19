import { OllamaEmbeddings } from "@langchain/ollama";

import type { EmbeddingProvider } from "./interface.js";

const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434",
});

export const ollamaEmbeddingProvider: EmbeddingProvider = {
    async embed(text: string): Promise<number[]> {
        return embeddings.embedQuery(text);
    },

   async embedBatch(texts: string[]): Promise<number[][]> {
        return embeddings.embedDocuments(texts);
    },
};