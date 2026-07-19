import type { Retriever, RetrievedChunk } from "./interface.js";
import { getEmbeddingProvider } from "../embeddings/index.js";
import { getVectorStore } from "../vector-store/index.js";
import { prisma } from "../../../prisma/client.js";


export const retrievalService: Retriever = {

    async search(query: string, limit: number): Promise<RetrievedChunk[]> {
        const queryEmbedding = await getEmbeddingProvider().embed(query);

        const results = await getVectorStore().similaritySearch(queryEmbedding, limit);
        const chunkIds = results.map(result => result.chunkId);

        const chunks = await prisma.documentChunk.findMany({
                where:{
                    id:{
                        in: chunkIds
                    }
                }
            });


        return results.map(result => {

            const chunk = chunks.find(
                item => item.id === result.chunkId
            );


            return {
                chunkId: result.chunkId,
                content: chunk?.content ?? "",
                score: result.score,
            };
        });
    },
};