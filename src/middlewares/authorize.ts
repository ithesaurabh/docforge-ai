import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

const authorize = (permission: string) => (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    if (!req.user.permissions.includes(permission)) {
      throw new ApiError(403, "Forbidden");
    }

    next();
  };

export default authorize;