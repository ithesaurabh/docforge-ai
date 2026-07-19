import { postgresVectorStore } from "./postgres.js";

export const getVectorStore = () => {
    return postgresVectorStore;
};