import type { Request, Response } from "express";
import { chatService } from "../services/chat.js";
import ApiError from "../../../utils/ApiError.js";

const chat = async (req: Request, res: Response) => {
    const {  question,  documentIds, topK, } = req.body;
    if(!req.user){
        throw new ApiError(401, "Authentication required");
    }
    const response = await chatService.chat({
        userId : req.user.id,
        conversationId :  req.body.conversationId,
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
