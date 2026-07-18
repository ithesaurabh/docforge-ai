import type { ParsedDocument } from "../parser/interface.js";
import { Prisma } from "../../../generated/prisma/client.js";

export interface DocumentChunk {
    page: number;
    chunkIndex: number;
    content: string;
    metadata?: Prisma.InputJsonValue;
}

export interface DocumentChunker {
    chunk(
        document: ParsedDocument
    ): Promise<DocumentChunk[]>;
}