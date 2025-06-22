import { clerkClient } from "@clerk/express";


export const protectAdmin = async(req,res,next)=>{
    try {
        const {userId} = req.auth

        const user = await clerkClient.users.getUser(userId)

        if(user.privateMetadata.role!=='admin'){
            return res.status(400).json({message:"Not Authorized"})
        }
        else{
            console.log("User Authorized");
            
            next()
        }
        
    } catch (error) {
        res.status(400).json({message:"Not Authorized"})
    }
}