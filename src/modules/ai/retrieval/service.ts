import type { Retriever, RetrievedChunk, RetrievalRequest } from "./interface.js";
import { getEmbeddingProvider } from "../embeddings/index.js";
import { getVectorStore } from "../vector-store/index.js";
import { prisma } from "../../../prisma/client.js";


export const retrievalService: Retriever = {

    async search(request: RetrievalRequest): Promise<RetrievedChunk[]> {
        const queryEmbedding = await getEmbeddingProvider().embed(request.query);

        const results = await getVectorStore().similaritySearch({
            embedding: queryEmbedding,
            limit: request.limit ?? 5,  
            documentIds: request.documentIds,
        });
        const chunkIds = results.map(result => result.chunkId);

        const chunks = await prisma.documentChunk.findMany({
            where: {
                id: {
                    in: chunkIds
                }
            }
        });


        return results.map(result => {
            const chunk = chunks.find(
                item => item.id === result.chunkId
            );

            return {
                documentId: chunk?.documentId ?? "",
                page: chunk?.page ?? 0,
                chunkId: result.chunkId,
                chunkIndex: chunk?.chunkIndex ?? 0,
                content: chunk?.content ?? "",
                score: result.score,
            };
        });
    },
};