import express from "express";
import getPrismaInstance from "../utils/PrismaClient.js";

export const addMessage = async(req, res, next) => {
    try{
        const prisma = getPrismaInstance();
        const { message, fromUser , toUser } = req.body;
        const getUser = onlineUsers.get(toUser);
        if(message && fromUser && toUser){
            const newMessage = await prisma.messages.create({
                data:{
                    message,
                    sender: {connect : {id: parseInt(fromUser)}},
                    reciever: {connect : {id: parseInt(toUser)}},
                    messageStatus: getUser ? "delivered" : "sent",
                },
                include:{
                    sender: true, 
                    reciever: true
                },
            });
            return res.status(200).send({message: newMessage});
        } else {
            return response.status(400).send("receiver, sender and messages are required");
        }
    }catch(err){
        next(err);
    }
}

export const getMessages = async(req, res, next) => {
    try{
        const prisma = getPrismaInstance();
        const {fromUser, toUser} = req.params;
        const messages = await prisma.messages.findMany({
            where:{
                OR:[
                    {
                        senderId: parseInt(fromUser),
                        recieverId: parseInt(toUser),   
                    },
                    {
                        senderId: parseInt(toUser),
                        recieverId: parseInt(fromUser),
                    }
                ]
            },
            orderBy:{
                id: "asc",
            },
        });

        const unreadMessages = [];

        messages.forEach((message, index) => {
            if(message.messageStatus !== "read" && message.senderId === parseInt(toUser)){
                message.messageStatus = "read";
                unreadMessages.push(message.id);
            }
        });

        await prisma.messages.updateMany({
            where: {
                id: {
                    in: unreadMessages,  // update all unread messages  array
                },
            },
            data: {
                messageStatus: "read",
            },
        });
        res.status(200).json({messages});
    } catch(err){
        next(err);
    }
}


