import dotenv from "dotenv";

dotenv.config();

const storage = {
    PROVIDER: (process.env.STORAGE_PROVIDER ?? "LOCAL") as "LOCAL" | "S3",
    UPLOAD_ROOT: process.env.UPLOAD_ROOT || "uploads",
    DOCUMENT_UPLOAD_PATH: process.env.DOCUMENT_UPLOAD_PATH || "documents",
    MAX_FILE_SIZE: Number(process.env.MAX_FILE_SIZE ?? 10485760),
};

export default storage;