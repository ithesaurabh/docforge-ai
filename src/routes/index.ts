
import { Router } from "express";
import { documentRoutes } from "../modules/documents/index.js";
import {chatRoutes} from "../modules/chat/index.js";
import authRoutes from "../modules/auth/routes.js";
const router = Router();

router.use("/", authRoutes);
router.use("/documents", documentRoutes);
router.use("/chat", chatRoutes);
router.use("/health", (req, res) => {
    res.status(200).json({ message: "API is healthy & running" });
});

export default router

