import { Request, Response } from "express";
import authService from "./service.js";

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.login(
        email,
        password
    );

    res.status(200).json({
        success: true,
        data: result
    });
};

export default {
    login
};