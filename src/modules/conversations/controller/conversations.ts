import { Request, Response } from "express";
import conversationService from "../service/conversations.js";
import ApiError from "../../../utils/ApiError.js";

export const createConversation = async (req: Request, res: Response) => {

    if (!req.user) {
        throw new ApiError(402, "Bad request");
    }
    const conversation = await conversationService.createConversation(req.user.id, req.body.title ?? '');
    res.status(201).json({
        success: true,
        message: "Created successfully",
        data: conversation,
    });

};

export const getConversations = async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(400, "Bad request");
    }
    const conversations = await conversationService.getUserConversations(req.user.id);
    if (conversations.length ===0) {
        throw new ApiError(404, "No Data Found");
    }
    res.json({
        success: true,
        message: "Data fetched successfully",
        data: conversations,
    });
};

export const getConversation = async (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
        throw new ApiError(400, "Bad request");
    }
    const conversation = await conversationService.getConversation(req.params.id, req.user.id);
    if (!conversation) {
        throw new ApiError(404, "No Data Found");
    }
    res.json({
        success: true,
        message: "Data fetched successfully",
        data: conversation,
    });

};