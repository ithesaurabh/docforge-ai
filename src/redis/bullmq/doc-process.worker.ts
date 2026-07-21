import { Worker } from "bullmq";
import connection from "./bullmq.js";
import { processDocument } from "../../modules/documents/services/process.js";


new Worker("process-doc-upload", async (job) => {
    const { id } = job.data;
    await processDocument(id);
}, { connection, }
);