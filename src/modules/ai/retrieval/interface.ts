export interface RetrievedChunk {
    documentId: string;
    page: number;
    chunkId: string;
    content: string;
    score: number;
}


export interface Retriever {
    search(
        query: string,
        limit: number
    ): Promise<RetrievedChunk[]>;
}