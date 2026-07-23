import { Request, Response } from "express";
import messageService from "../service/messages.js";
import ApiError from "../../../utils/ApiError.js";

export const getMessages = async (req: Request<{ conversationId: string }>, res: Response) => {
    const { conversationId } = req.params;

    const messages = await messageService.getMessages(
        conversationId
    );
    if (messages.length ===0) {
        throw new ApiError(404, "No Data Found");
    }
    res.json({
        success: true,
        message: "Data fetched successfully",
        data: messages
    });

};