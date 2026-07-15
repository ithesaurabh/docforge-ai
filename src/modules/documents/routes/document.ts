import { Router } from "express";
import  DocumentController from "../controllers/document.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/", upload.single("file"), DocumentController.DocumentUpload);

export default router;