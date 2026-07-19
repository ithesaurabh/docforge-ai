export interface ChunkEmbedding {
    chunkId: string;
    embedding: number[];
}

export interface SimilaritySearchResult {
    chunkId: string;
    score: number;
}

export interface SimilaritySearchRequest {
    embedding: number[];
    limit: number;
    documentIds?: string[];
}

export interface VectorStore {
    index(chunks: ChunkEmbedding[]): Promise<void>;

    similaritySearch(request: SimilaritySearchRequest): Promise<SimilaritySearchResult[]>;
}