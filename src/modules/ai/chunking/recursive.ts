import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type {DocumentChunk, DocumentChunker, } from "./interface.js";
import type { ParsedDocument } from "../parser/interface.js";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

export const recursiveChunker: DocumentChunker = {
    async chunk(document: ParsedDocument): Promise<DocumentChunk[]> {
        const chunks: DocumentChunk[] = [];

        let chunkIndex = 0;

        for (const page of document.pages) {
            const pageChunks = await splitter.splitText(page.text);

            for (const content of pageChunks) {
                chunks.push({
                    page: page.pageNumber,
                    chunkIndex: chunkIndex++,
                    content,
                });
            }
        }

        return chunks;
    },
};