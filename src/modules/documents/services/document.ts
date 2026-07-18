import { createHash } from "crypto";
import path from "path";
import { prisma } from "../../../prisma/client.js";
import ApiError from "../../../utils/ApiError.js";
import { DOCUMENT_TYPE_MAP } from "../constants/document-formats.js";
import StorageFactory from "./storage-factory.js";
import { processDocument } from "./process.js";

const storage = StorageFactory.create();
const uploadDocument = async (file: Express.Multer.File, title?: string) => {
    const storedFile = await storage.upload(file);

    const checksum = createHash("sha256")
        .update(file.buffer)
        .digest("hex");

    const extension = path.extname(file.originalname).toLowerCase();

    const documentType = DOCUMENT_TYPE_MAP[
        extension as keyof typeof DOCUMENT_TYPE_MAP
    ];

    if (!documentType) {
        throw new ApiError(400, "Unsupported document type.");
    }

    //check existing document with the same checksum
    const existingDocument = await prisma.document.findUnique({
        where: {
            checksum,
        },
    });

    if (existingDocument) {
        storage.delete(storedFile.storageKey);
        throw new ApiError(409, "Document already exists.");
    }

    const document = await prisma.document.create({
        data: {
            title: title?.trim() ?? path.basename(file.originalname, extension),
            originalName: file.originalname,
            documentType,
            mimeType: file.mimetype,
            fileSize: file.size,
            storageProvider: storedFile.storageProvider,
            storageKey: storedFile.storageKey,
            checksum,
        },
    });

    try {
        await prisma.document.update({
            where: {
                id: document.id,
            },
            data: {
                status: "PROCESSING",
            },
        });

        await processDocument(document.id);

        await prisma.document.update({
            where: {
                id: document.id,
            },
            data: {
                status: "READY",
            },
        });
    } catch (error) {
        await prisma.document.update({
            where: {
                id: document.id,
            },
            data: {
                status: "FAILED",
            },
        });

        throw error;
    }

    return prisma.document.findUniqueOrThrow({
        where: {
            id: document.id,
        },
    });
};

export default { uploadDocument };