import { prisma } from "../../../prisma/client.js";

const createConversation = async (userId: string, title?: string) => {
    
    return prisma.conversation.create({
        data: {
            userId,
            title: title !== '' ? title : "New Conversation",
        },
    });

};


const getUserConversations = async (userId: string) => {

    return prisma.conversation.findMany({
        where:{
            userId,
        },
        orderBy:{
            updatedAt:"desc",
        },
    });

};


const getConversation = async (id:string, userId:string) => {

    return prisma.conversation.findFirst({
        where:{
            id,
            userId,
        },
        include:{
            messages:{
                orderBy:{
                    createdAt:"asc",
                }
            }
        }
    });

};


export default {createConversation, getUserConversations, getConversation,};