import { retrievalService } from "../../ai/retrieval/index.js";
import { ollamaChatModel } from "./ollama.js";
import { promptBuilder } from "./prompt.js";
import type { ChatRequest, ChatResponse, ChatService, } from "../interface.js";

export const chatService: ChatService = {
    async chat(request: ChatRequest): Promise<ChatResponse> {
        const retrievedChunks = await retrievalService.search({
            query: request.question,
            limit: request.topK ?? 5,
            documentIds: request.documentIds,
        });

        const prompt = promptBuilder.build(
            request.question,
            retrievedChunks
        );

        const answer = await ollamaChatModel.generate(prompt);

        return {
            answer,
            sources: retrievedChunks.map((chunk) => ({
                documentId: chunk.documentId,
                page: chunk.page,
                chunkIndex: chunk.chunkIndex,
                score: chunk.score,
            })),
        };
    },
};