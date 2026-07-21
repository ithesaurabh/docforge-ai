import { Queue } from "bullmq";
import connection from "./bullmq.js";

export const processDocUpload = new Queue("process-doc-upload", {
  connection,
});