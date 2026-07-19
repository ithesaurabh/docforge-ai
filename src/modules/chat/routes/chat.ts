import { Router } from "express";

import chatController from "../controllers/chat.js";

const router = Router();
router.post("/", chatController.chat);

export default router;