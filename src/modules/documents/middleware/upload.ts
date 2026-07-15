import multer from "multer";

import storageConfig  from "../../../config/storage.js";
import { SUPPORTED_DOCUMENT_MIME_TYPES } from "../constants/document-formats.js";

export const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: storageConfig.MAX_FILE_SIZE,
    },

    fileFilter(_, file, callback) {
        if (
            SUPPORTED_DOCUMENT_MIME_TYPES.includes(
                file.mimetype as (typeof SUPPORTED_DOCUMENT_MIME_TYPES)[number]
            )
        ) {
            return callback(null, true);
        }

        callback(new Error("Unsupported document type."));
    },
});