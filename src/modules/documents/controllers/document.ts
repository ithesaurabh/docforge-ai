import type {Request, Response } from "express";
import DocumentService from "../services/document.js";
import ApiError from "../../../utils/ApiError.js";

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

const DocumentGet = async (req: Request, res: Response) => {

    const document = await DocumentService.getDocument();

    if(!document || document.length === 0) {
        throw new ApiError(404, "No documents found.");
    }
    return res.status(200).json({
        success: true,
        message: "Document retrieved successfully.",
        data: document,
    });
};
const getOneDocument = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const document = await DocumentService.getOneDocument(id);
    if (!document) {
        throw new ApiError(404, "Document not found.");
    }
    return res.status(200).json({
        success: true,
        message: "Document retrieved successfully.",
        data: document,
    });
};
const DocumentDownload = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const document = await DocumentService.downloadDocument(id);
    res.download(document.filePath, document.originalName);
};

const DocumentDelete = async (req:Request<{id:string}>, res:Response) =>{
    const { id } = req.params;

    const isDeleted = await DocumentService.deleteDocument(id);

    if(!isDeleted){
        throw new ApiError(500, 'Something went wrong. Please try again later');
    }
    return res.status(200).json({
        'status' : true,
        'message' : 'Data deleted Successfully',
    })
}
export default { DocumentUpload, DocumentGet, DocumentDownload, getOneDocument, DocumentDelete };