import { StorageProvider } from "../../../generated/prisma/client.js";


export interface StoredFile {
    storageKey: string;
    storageProvider: StorageProvider;
}

export interface StorageService {
    upload(file: Express.Multer.File): Promise<StoredFile>;
    delete(storageKey: string): Promise<void>;
    resolve(storageKey: string): Promise<string>;
}