export interface RetrievedChunk {
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