import { prisma } from "../../../prisma/client.js";
import ApiError from "../../../utils/ApiError.js";
import { recursiveChunker } from "../../ai/chunking/index.js";
import { getEmbeddingProvider } from "../../ai/embeddings/index.js";
import { getParser } from "../../ai/parser/registry.js";
import { getVectorStore } from "../../ai/vector-store/index.js";
import { LocalStorageService } from "./local-storage.js";

const storage = LocalStorageService;

export const processDocument = async (documentId: string) => {
    const document = await prisma.document.findUnique({
        where: {
            id: documentId,
        },
    });

    if (!document) {
        throw new ApiError(404, "Document not found.");
    }
    await prisma.document.update({
        where: {
            id: document.id,
        },
        data: {
            status: "PROCESSING",
        },
    });

    const parser = getParser(document.documentType);

    const filePath = await storage.resolve(
        document.storageKey
    );

    const parsedDocument = await parser.parse(filePath);
    const chunks = await recursiveChunker.chunk(parsedDocument);

    const savedChunks = await prisma.$transaction(
        chunks.map((chunk) =>
            prisma.documentChunk.create({
                data: {
                    documentId: document.id,
                    page: chunk.page,
                    chunkIndex: chunk.chunkIndex,
                    content: chunk.content,
                },
            })
        )
    );

    const embeddingProvider = getEmbeddingProvider();

    const vectors = await embeddingProvider.embedBatch(
        savedChunks.map((chunk) => chunk.content)
    );
    const vectorStore = getVectorStore();

    await vectorStore.index(
        savedChunks.map((chunk, index) => ({
            chunkId: chunk.id,
            embedding: vectors[index],
        }))
    );

    await prisma.document.update({
        where: {
            id: document.id,
        },
        data: {
            status: "READY",
        },
    });
};