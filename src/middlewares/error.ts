import { Request, Response, NextFunction } from "express";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import { Prisma } from "../generated/prisma/client.js";
// import { ZodError } from "zod";
import { writeErrorLog } from "../utils/logger.js";

const errorMiddleware = async (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    await writeErrorLog(_req, err);

    // if (err instanceof ZodError) {
    //     err = new ApiError(400, err.issues[0]?.message ?? "Validation failed");
    // }

    // Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

        switch (err.code) {

            case "P2002":
                err = new ApiError(409, "A record with the provided unique field already exists.");
                break;

            case "P2003":
                err = new ApiError(400, "Invalid reference. Related record does not exist.");
                break;

            case "P2025":
                err = new ApiError(404, "Requested record was not found.");
                break;

            case "P2014":
                err = new ApiError(400, "Operation would violate a required relationship.");
                break;

            case "P2000":
                err = new ApiError(400, "One or more values are too long.");
                break;

            case "P2001":
                err = new ApiError(404, "Record does not exist.");
                break;

            default:
                err = new ApiError(400, "Database request failed.");
        }
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        // err = new ApiError(400, "Invalid request payload.");
        err = new ApiError(400,err.message);
    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        err = new ApiError(500, "Unexpected database error occurred.");
    }

    if (err instanceof Prisma.PrismaClientInitializationError) {
        err = new ApiError(500, "Database connection failed.");
    }

    //Hope you never get this
    if (err instanceof Prisma.PrismaClientRustPanicError) {
        err = new ApiError(500, "Database engine crashed.");
    }


    // Default fallback
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack:
            env.NODE_ENV === "development"
                ? err.stack
                : undefined,
    });
};

export default errorMiddleware;