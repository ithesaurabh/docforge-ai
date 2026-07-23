import { retrievalService } from "../../ai/retrieval/index.js";
import { ollamaChatModel } from "./ollama.js";
import { promptBuilder } from "./prompt.js";
import type { ChatRequest, ChatResponse, ChatService, } from "../interface.js";
import ApiError from "../../../utils/ApiError.js";
import { prisma } from "../../../prisma/client.js";

export const chatService: ChatService = {
    async chat(request: ChatRequest): Promise<ChatResponse> {
        //verify conversation belongs to the user
        const conversation = await prisma.conversation.findFirst({
            where: {
                id: request.conversationId,
                userId: request.userId
            }
        });
        if (!conversation) {
            throw new ApiError(404, "Conversation not found");
        }


        // 2. Store user message
        await prisma.message.create({
            data: {
                conversationId: request.conversationId,
                role: "USER",
                content: request.question
            }
        });

        const history = await prisma.message.findMany({
            select: {
                role: true,
                content: true
            },
            where: {
                conversationId: request.conversationId
            },
            orderBy: {
                createdAt: "asc"
            },
            take: 20
        });

        //retrieve the chunks
        const retrievedChunks = await retrievalService.search({
            query: request.question,
            limit: request.topK ?? 5,
            documentIds: request.documentIds,
        });

        const prompt = promptBuilder.build(
            request.question,
            history,
            retrievedChunks
        );

        const answer = await ollamaChatModel.generate(prompt);

        //store answer too
        await prisma.message.create({
            data: {
                conversationId: request.conversationId,
                role: "ASSISTANT",
                content: answer
            }
        });

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