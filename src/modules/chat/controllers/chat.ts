import type { Request, Response } from "express";
import { chatService } from "../services/chat.js";

const chat = async (req: Request, res: Response) => {
    const {  question,  documentIds, topK, } = req.body;

    const response = await chatService.chat({
        question,
        documentIds,
        topK,
    });

    return res.status(200).json({
        success: true,
        data: response,
    });
};

export default {
    chat,
};
