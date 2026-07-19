export interface ChunkEmbedding {
    chunkId: string;
    embedding: number[];
}

export interface SimilaritySearchResult {
    chunkId: string;
    score: number;
}

export interface VectorStore {
    index(chunks: ChunkEmbedding[]): Promise<void>;

    similaritySearch(
        embedding: number[],
        limit: number
    ): Promise<SimilaritySearchResult[]>;
}