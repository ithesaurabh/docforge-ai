import { Request, Response } from "express";
import permissionService from "./service.js";
import ApiError from "../../utils/ApiError.js";

const getPermissions = async (req: Request, res: Response) => {

    const permissions = await permissionService.getPermissions();

    if (permissions.length === 0) {
        throw new ApiError(404, "No data found");
    }
    
    return res.status(200).json({
        success: true,
        message: "Permissions fetched successfully",
        data: permissions,
    });
};

export default { getPermissions };