import {PrismaClient} from '@prisma/client'; 
//PrismaClient is a constructor function that creates a new PrismaClient instance. This instance is used to interact with the database.

let prismaInstance = null; 

function getPrismaInstance() { 
    if(!prismaInstance) {
        prismaInstance = new PrismaClient(); //Create a new PrismaClient instance if it doesn't already exist.
    }
    return prismaInstance;
}

export default getPrismaInstance;
