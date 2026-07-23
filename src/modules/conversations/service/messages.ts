import { prisma } from "../../../prisma/client.js";


const createMessage = async (
    conversationId: string,
    role: "USER" | "ASSISTANT",
    content: string
) => {

    return prisma.message.create({
        data:{
            conversationId,
            role,
            content,
        }
    });

};


const getMessages = async (conversationId:string) => {

    return prisma.message.findMany({
        where:{
            conversationId,
        },
        orderBy:{
            createdAt:"asc",
        }
    });

};

export default {createMessage, getMessages };