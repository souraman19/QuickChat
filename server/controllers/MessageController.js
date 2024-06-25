import express from "express";
import getPrismaInstance from "../utils/PrismaClient.js";
import { renameSync } from "fs";

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
                    receiver: {connect : {id: parseInt(toUser)}},
                    messageStatus: getUser ? "delivered" : "sent",
                },
                include:{
                    sender: true, 
                    receiver: true
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
                        receiverId: parseInt(toUser),   
                    },
                    {
                        senderId: parseInt(toUser),
                        receiverId: parseInt(fromUser),
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

export const addImageMessage = async(req, res, next) => {
    try{
        if(req.file){
            const date = Date.now();
            
            let filename = "uploads/images/" + date + req.file.originalname;


            renameSync(req.file.path, filename);
            const prisma = getPrismaInstance();
            const {fromUser, toUser} = req.query;
            if(fromUser &&  toUser){
                const message = await prisma.messages.create({
                    data:{
                        message: filename, 
                        sender: {connect: {id: parseInt(fromUser)}},
                        receiver: {connect: {id: parseInt(toUser)}},
                        type: "image",
                    },
                });
                return res.status(201).send({ message });
            }
            return res.status(400).send("fromUser and toUser is required");
        }
        return res.status(400).send("Image is required");
    }catch(err){
        next(err);
    }
}


export const addAudioMessage = async(req, res, next) => {
    try{
        if(req.file){
            const date = Date.now();
            
            let filename = "uploads/recordings/" + date + req.file.originalname;

            console.log(filename);
            
            renameSync(req.file.path, filename);
            const prisma = getPrismaInstance();
            const {fromUser, toUser} = req.query;
            if(fromUser &&  toUser){
                const message = await prisma.messages.create({
                    data:{
                        message: filename, 
                        sender: {connect: {id: parseInt(fromUser)}},
                        receiver: {connect: {id: parseInt(toUser)}},
                        type: "audio",
                    },
                });
                return res.status(201).send({ message });
            }
            return res.status(400).send("fromUser and toUser is required");
        }
    return res.status(400).send("Audio is required");
    }catch(err){
        next(err);
    }
}