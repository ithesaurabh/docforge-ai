import { prisma } from "../../../prisma/client.js";
import ApiError from "../../../utils/ApiError.js";
import { getParser } from "../../ai/parser/registry.js";
import { LocalStorageService } from "./local-storage.js";

const storage = LocalStorageService;

export const processDocument = async (documentId: string) => {
    const document = await prisma.document.findUnique({
        where: {
            id: documentId,
        },
    });

    if (!document) {
        throw new ApiError(404, "Document not found.");
    }

    const parser = getParser(document.documentType);

    const filePath = await storage.resolve(
        document.storageKey
    );

    const parsedDocument = await parser.parse(filePath);

    return parsedDocument;
};