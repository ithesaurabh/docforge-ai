import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import { createConversation, getConversations, getConversation } from "./controller/conversations.js";
import { getMessages } from "./controller/messages.js";

const router = Router();

router.use(authenticate);
router.post("/",createConversation);
router.get("/", getConversations);
router.get("/:id", getConversation);

router.get("/:conversationId/messages",getMessages);
export default router;