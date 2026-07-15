import { Request } from "express";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "error.log");

export const writeErrorLog = async (req: Request,
  error: unknown) => {
    const timestamp = new Date().toISOString();

    // Clone body so we don't mutate req.body
    const body = { ...req.body };

    // Remove sensitive fields
    delete body.password;
    delete body.passwordHash;
    delete body.confirmPassword;
    delete body.token;
    delete body.refreshToken;

    const log = `
==================================================
Time      : ${timestamp}
Method    : ${req.method}
URL       : ${req.originalUrl}
IP        : ${req.ip}

Params    : ${JSON.stringify(req.params, null, 2)}
Query     : ${JSON.stringify(req.query, null, 2)}
Payload   : ${JSON.stringify(body, null, 2)}

Error
--------------------------------------------------
${error instanceof Error ? error.stack : String(error)}
==================================================

`;

    try {
        // Creates the directory if it doesn't exist.
        // If it already exists, nothing happens.
        await mkdir(LOG_DIR, { recursive: true });

        // Creates the file if it doesn't exist, then appends.
        await appendFile(LOG_FILE, log, "utf-8");
    } catch (err) {
        console.error("Failed to write log:", err);
    }
};