import { Router } from "express";
import { DocumentController } from "../controllers/document.js";
import { upload } from "../middleware/upload.js";

const router = Router();

const controller = new DocumentController();

router.post(
    "/",
    upload.single("file"),
    controller.upload
);

export default router;