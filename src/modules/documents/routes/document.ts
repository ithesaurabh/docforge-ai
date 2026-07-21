import { Router } from "express";
import  DocumentController from "../controllers/document.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/", upload.single("file"), DocumentController.DocumentUpload);
router.get("/", DocumentController.DocumentGet);
router.get("/:id/download", DocumentController.DocumentDownload);
router.get("/:id", DocumentController.getOneDocument);
router.delete("/:id", DocumentController.DocumentDelete);
export default router;