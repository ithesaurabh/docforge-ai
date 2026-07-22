import { prisma } from "../../prisma/client.js";

const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    });
};

export default {
    findUserByEmail
};
