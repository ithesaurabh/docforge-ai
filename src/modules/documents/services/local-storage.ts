import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import storageConfig from "../../../config/storage.js";
import type { StorageService, StoredFile, } from "../interfaces/storage.js";

const upload = async (
    file: Express.Multer.File
): Promise<StoredFile> => {
    const extension = path.extname(file.originalname);

    const filename = `${randomUUID()}${extension}`;

    const storageKey = path.posix.join(
        storageConfig.DOCUMENT_UPLOAD_PATH,
        filename
    );

    const absolutePath = path.join(
        storageConfig.UPLOAD_ROOT,
        storageKey
    );

    await fs.mkdir(path.dirname(absolutePath), {
        recursive: true,
    });

    await fs.writeFile(absolutePath, file.buffer);

    return {
        storageKey,
        storageProvider: "LOCAL",
    };
};

const remove = async (storageKey: string): Promise<void> => {
    const absolutePath = path.join(
        storageConfig.UPLOAD_ROOT,
        storageKey
    );

    try {
        await fs.unlink(absolutePath);
    } catch {
        // Ignore if the file does not exist.
    }
};

export const localStorageService: StorageService = {
    upload,
    delete: remove,
};