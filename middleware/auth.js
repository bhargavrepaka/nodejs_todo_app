import { User } from "../models/user.js"
import jwt from "jsonwebtoken"

export const isAuthenticated= async (req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.status(500).json({
            success:false,
            message:"Login First",
            statuscode:500
        })
    }
    const userId= jwt.verify(req.cookies.token,process.env.JWT_SECRET)._id
    req.user= await User.findById(userId)
    next()
}