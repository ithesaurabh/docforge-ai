import { prisma } from "../../../prisma/client.js";
import ApiError from "../../../utils/ApiError.js";
import { recursiveChunker } from "../../ai/chunking/index.js";
import { getParser } from "../../ai/parser/registry.js";
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

    const parser = getParser(document.documentType);

    const filePath = await storage.resolve(
        document.storageKey
    );

    const parsedDocument = await parser.parse(filePath);
    const chunks = await recursiveChunker.chunk(parsedDocument);

    await prisma.documentChunk.createMany({
        data: chunks.map((chunk) => ({
            documentId: document.id,
            page: chunk.page,
            chunkIndex: chunk.chunkIndex,
            content: chunk.content,
            metadata: chunk.metadata,
        })),
    });

    await prisma.document.update({
        where: {
            id: document.id,
        },
        data: {
            status: "READY",
        },
    });
};