import type { NextFunction, Request, Response } from "express";
import { DocumentService } from "../services/document.js";

export class DocumentController {
    private readonly documentService = new DocumentService();

    upload = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({
                    success: false,
                    message: "No document uploaded.",
                });

                return;
            }

            const document = await this.documentService.upload(
                req.file,
                req.body.title
            );

            res.status(201).json({
                success: true,
                message: "Document uploaded successfully.",
                data: document,
            });
        } catch (error) {
            next(error);
        }
    };
}