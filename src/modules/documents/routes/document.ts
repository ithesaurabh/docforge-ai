import { Router } from "express";
import  DocumentController from "../controllers/document.js";
import { upload } from "../middleware/upload.js";
import authenticate from "../../../middlewares/authenticate.js";
import authorize from "../../../middlewares/authorize.js";

const router = Router();

router.post("/",authenticate, authorize("document.upload"), upload.single("file"), DocumentController.DocumentUpload);
router.get("/",authenticate, authorize("document.read"), DocumentController.DocumentGet);
router.get("/:id/download", DocumentController.DocumentDownload);
router.get("/:id",authenticate, authorize("document.read"), DocumentController.getOneDocument);
router.delete("/:id",authenticate, authorize("document.delete"), DocumentController.DocumentDelete);
export default router;