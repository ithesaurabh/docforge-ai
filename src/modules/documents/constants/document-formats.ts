import { DocumentType } from "../../../generated/prisma/client.js";

export const DOCUMENT_FORMATS = {
    PDF: {
        extension: ".pdf",
        mimeType: "application/pdf",
        type: DocumentType.PDF,
    },

    DOCX: {
        extension: ".docx",
        mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        type: DocumentType.DOCX,
    },

    TXT: {
        extension: ".txt",
        mimeType: "text/plain",
        type: DocumentType.TXT,
    },

    MARKDOWN: {
        extension: ".md",
        mimeType: "text/markdown",
        type: DocumentType.MARKDOWN,
    },
} as const;

export const SUPPORTED_DOCUMENT_MIME_TYPES = Object.values(
    DOCUMENT_FORMATS
).map((format) => format.mimeType);

export const DOCUMENT_TYPE_MAP = Object.values(
    DOCUMENT_FORMATS
).reduce(
    (acc, format) => {
        acc[format.extension] = format.type;
        return acc;
    },
    {} as Record<string, DocumentType>
);