import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
    try{
        const {email} = req.body;
        // console.log(email);
        if(!email) {
            return res.status(400).json({message: "Email is required", status: false});
        }

        const prisma = getPrismaInstance();
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            // console.log("1");
            return res.json({message: "user not found", status: false});
        } else {
            console.log("2");
            return response.json({message: "user found", status: true, data: user});
        }
    }catch(err){
        next(err);
    }
}