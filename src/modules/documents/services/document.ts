import { createHash } from "crypto";
import path from "path";
import { prisma } from "../../../prisma/client.js";
import ApiError from "../../../utils/ApiError.js";
import { DOCUMENT_TYPE_MAP } from "../constants/document-formats.js";
import StorageFactory from "./storage-factory.js";
import { processDocument } from "./process.js";
import storageConfig from "../../../config/storage.js";
import fs from "fs";
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

const getDocument = async () => {
    const documents = await prisma.document.findMany({
        select: {
            id: true,
            title: true,
            documentType: true,
            fileSize: true,
            status: true,
            createdAt: true,
            storageKey: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return documents.map(doc => ({
        ...doc,
        downloadUrl: `/api/v1/documents/${doc.id}/download`,
    }));
};


const downloadDocument = async (id: string) => {
    console.log("Downloading document with ID:", id);
    const document = await prisma.document.findUnique({
        where: {
            id,
        },
    });

    if (!document) {
        throw new ApiError(404, "Document not found.");
    }

    if (document.storageProvider !== "LOCAL") {
        throw new ApiError(400, "Download provider not supported");
    }

    const filePath = path.join(storageConfig.UPLOAD_ROOT, document.storageKey);

    if (!fs.existsSync(filePath)) {
        throw new ApiError(404, "File missing from storage");
    }

    return {
        filePath,
        originalName: document.originalName,
    };
}

const getOneDocument = async (id: string) => {
    let document = await prisma.document.findUnique({
        select: {
            id: true,
            title: true,
            documentType: true,
            fileSize: true,
            status: true,
            createdAt: true,
            storageKey: true,
        },
        where: {
            id,
        },
    });
    if (!document) {
        throw new ApiError(404, "Data not found.");
    }
    return {
        ...document,
        downloadUrl: `/api/v1/documents/${document.id}/download`,
    };
}


const deleteDocument = async (id : string)=>{
    const exists = await prisma.document.findUnique({
        where : {
            id,
        }
    });
    if(!exists){
        throw new ApiError(404, 'Data not found.');
    }

    return await prisma.document.delete({
        where:{
            id,
        }
    });
}
export default { uploadDocument, getDocument, downloadDocument, getOneDocument, deleteDocument };