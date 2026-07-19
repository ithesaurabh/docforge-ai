import type { RetrievedChunk } from "../ai/retrieval/interface.js";

export interface ChatRequest {
    question: string;

    documentIds?: string[];

    topK?: number;
}

export interface ChatSource {
    documentId: string;

    page: number;

    chunkIndex: number;

    score: number;
}

export interface ChatResponse {
    answer: string;

    sources: ChatSource[];
}

export interface ChatService {
    chat(request: ChatRequest): Promise<ChatResponse>;
}

export interface PromptBuilder {
    build(
        question: string,
        chunks: RetrievedChunk[]
    ): string;
}

export interface ChatModel {
    generate(prompt: string): Promise<string>;
}