export interface RetrievalRequest {
    query: string;

    limit?: number;

    documentIds?: string[];
}

export interface RetrievedChunk {
    documentId: string;
    page: number;
    chunkId: string;
    chunkIndex: number;
    content: string;
    score: number;
}

export interface Retriever {
    search(request: RetrievalRequest): Promise<RetrievedChunk[]>;
}