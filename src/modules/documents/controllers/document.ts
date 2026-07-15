import type { NextFunction, Request, Response } from "express";
import DocumentService from "../services/document.js";
import { upload } from "../middleware/upload.js";



const DocumentUpload = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No document uploaded.",
        });
    }
    const document = await DocumentService.uploadDocument(req.file, req.body.title);

    return res.status(201).json({
        success: true,
        message: "Document uploaded successfully.",
        data: document,
    });
};
export default { DocumentUpload };