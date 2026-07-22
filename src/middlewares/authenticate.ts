import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import { V4 } from "paseto";
import { publicKey } from "../utils/paseto.js";
import { prisma } from "../prisma/client.js";

const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        throw new ApiError(401, "Authentication token required");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = await V4.verify(
            token,
            publicKey
        );

        const user = await findByIdWithPermissions(payload.sub as string);

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        if (!user.isActive) {
            throw new ApiError(403, "User is inactive");
        }

        if (user.tokenVersion !== payload.version) {
            throw new ApiError(401, "Token expired");
        }
        const permissions = user?.role?.rolePermissions.map((rp) => rp.permission.key) ?? [];

        req.user = {
            id: user.id,
            email: user.email,
            roleId: user.roleId,
            permissions
        };

        next();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(401, "Invalid token");
    }
};

const findByIdWithPermissions = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },

    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
};

export default authenticate;