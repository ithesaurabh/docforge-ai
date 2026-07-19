import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../../prisma/client.js";
import type { ChunkEmbedding, SimilaritySearchRequest, SimilaritySearchResult, VectorStore, } from "./interface.js";

const toPgVector = (embedding: number[]): string => {
    return `[${embedding.join(",")}]`;
};

export const postgresVectorStore: VectorStore = {
    async index(chunks: ChunkEmbedding[]): Promise<void> {
        for (const chunk of chunks) {
            await prisma.$executeRaw`
                UPDATE "DocumentChunk"
                SET embedding = ${toPgVector(chunk.embedding)}::vector
                WHERE id = ${chunk.chunkId}
            `;
        }
    },

    async similaritySearch(request: SimilaritySearchRequest): Promise<SimilaritySearchResult[]> {

        const { embedding, limit, documentIds } = request;

        let results: { id: string; score: number }[];

        if (documentIds?.length) {

            results = await prisma.$queryRaw<{ id: string; score: number }[]>(
            Prisma.sql`
            SELECT
                id,
                embedding <=> ${toPgVector(embedding)}::vector AS score
            FROM "DocumentChunk"
            WHERE "documentId" IN (${Prisma.join(documentIds)})
            ORDER BY embedding <=> ${toPgVector(embedding)}::vector
            LIMIT ${limit}
        `);

        } else {

            results = await prisma.$queryRaw<
                { id: string; score: number }[]
            >(Prisma.sql`
            SELECT
                id,
                embedding <=> ${toPgVector(embedding)}::vector AS score
            FROM "DocumentChunk"
            ORDER BY embedding <=> ${toPgVector(embedding)}::vector
            LIMIT ${limit}
        `);

        }

        return results.map(result => ({
            chunkId: result.id,
            score: result.score,
        }));
    }
};