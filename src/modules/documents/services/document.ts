import { createHash } from "crypto";
import path from "path";
import {prisma} from "../../../prisma/client.js";

import { DOCUMENT_TYPE_MAP } from "../constants/document-formats.js";
import { StorageFactory } from "./storage-factory.js";

export class DocumentService {
    private readonly storage = StorageFactory.create();
    private readonly prisma = prisma; // Use the globally initialized Prisma client

    async upload(file: Express.Multer.File, title?: string) {
        const storedFile = await this.storage.upload(file);

        const checksum = createHash("sha256")
            .update(file.buffer)
            .digest("hex");

        const extension = path.extname(file.originalname).toLowerCase();

        const documentType = DOCUMENT_TYPE_MAP[extension as keyof typeof DOCUMENT_TYPE_MAP];

        if (!documentType) {
            throw new Error("Unsupported document type.");
        }

        return this.prisma.document.create({
            data: {
                title:
                    title?.trim() ||
                    path.basename(file.originalname, extension),

                originalName: file.originalname,

                documentType,

                mimeType: file.mimetype,

                fileSize: file.size,

                storageProvider: storedFile.storageProvider,

                storageKey: storedFile.storageKey,

                checksum,
            },
        });
    }
}