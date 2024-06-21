import getPrismaInstance from "../utils/PrismaClient.js"; 

export const checkUser = async (req, res, next) => { //This function checks if a user exists in the database.
    try{
        const {email} = req.body; 
        // console.log(email);
        if(!email) {
            return res.status(400).json({message: "Email is required", status: false}); 
        }

        const prisma = getPrismaInstance(); 
        const user = await prisma.user.findUnique({ //findUnique: Method to find a single record in the database.
            where:{ //where: Object that specifies the condition to match the record.
                email
            }
        })

        if(!user){
            // console.log("1");
            return res.json({message: "user not found", status: false});
        } else {
            // console.log("2");
            return res.json({message: "user found", status: true, data: user}); 
        }
    }catch(err){
        next(err);
    }
}

export const onBoardUser = async (req, res, next) => {
    try{
        const {name, email, about, image: profilePic} = req.body;
        console.log(req.body);
        if(!name || !email || !profilePic){
            return res.send("Email, name and ProfilePicture is required");
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.create({
            data:{name, email, about, profilePic}
        })
        return res.json({message: "User onboarded successfully", status: true, user});
    }catch(err){
        next(err);
    }
}