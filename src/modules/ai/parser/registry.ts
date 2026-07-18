import { DocumentType } from "../../../generated/prisma/client.js";
import { pdfParser } from "./pdf.js";
import { txtParser } from "./txt.js";
import type { DocumentParser } from "./interface.js";
import ApiError from "../../../utils/ApiError.js";

const parsers: Partial<Record<DocumentType, DocumentParser>> = {
    [DocumentType.PDF]: pdfParser,
    [DocumentType.TXT]: txtParser,
};

export const getParser = (documentType: DocumentType): DocumentParser => {
    const parser = parsers[documentType];

    if (!parser) {
        throw new ApiError(500, `No parser registered for ${documentType}`);
    }

    return parser;
};