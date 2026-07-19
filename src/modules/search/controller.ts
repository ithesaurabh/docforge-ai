import type { Request, Response } from "express";
import { retrievalService } from "../ai/retrieval/index.js";


export const search = async (req: Request, res: Response ) => {

    const query = req.query.q as string;

    if (!query) {
        return res.status(400).json({
            message: "Query is required"
        });
    }

    const results = await retrievalService.search(query, 5);

    return res.json(results);
};