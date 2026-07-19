import { ollamaEmbeddingProvider } from "./ollama.js";

export const getEmbeddingProvider = () => {
    return ollamaEmbeddingProvider;
};