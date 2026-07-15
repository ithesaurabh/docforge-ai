import type { Express } from "express";

export type StorageProvider = "LOCAL" | "S3";

export interface StoredFile {
    storageKey: string;
    storageProvider: StorageProvider;
}

export interface StorageService {
    upload(file: Express.Multer.File): Promise<StoredFile>;

    delete(storageKey: string): Promise<void>;
}