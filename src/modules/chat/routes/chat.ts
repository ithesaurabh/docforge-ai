import { Router } from "express";

import chatController from "../controllers/chat.js";
import authenticate from "../../../middlewares/authenticate.js";

const router = Router();
router.post("/",authenticate, chatController.chat);

export default router;