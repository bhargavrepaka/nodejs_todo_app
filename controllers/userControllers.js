import jwt from 'jsonwebtoken'
import ErrorHandler from '../middleware/error.js'
import {User} from '../models/user.js'
import bcrypt from "bcrypt"
import { sendCookie } from '../utils/features.js'

export const getAllUsers=async (req,res)=>{ 
    res.json({working:true})
 }

export const register=async (req,res,next)=>{ 
    const {name,email,password}=req.body
    
    const userExits=await User.findOne({email})
    if(userExits){ return next(new ErrorHandler("User already exists",400)) }

    const hashedPassword=await bcrypt.hash(password,10)

    const user = await User.create({name,email,password:hashedPassword})
    sendCookie(user,res,"Registered Successfully",201)
}

export const login=async (req,res,next)=>{
    const {email,password}=req.body
    const loginUser=await User.findOne({email}).select("+password")

    if(!loginUser){return next(new ErrorHandler("User Not found",404))}   

    const isMatch=await bcrypt.compare(password,loginUser.password)
    if(!isMatch){return next(new ErrorHandler("Password Mismatch",400))}

    sendCookie(loginUser,res,`Welcome Back ${loginUser.name}`,200)

 }

export const getMyDetails=async (req,res)=>{ 
    
    res.status(200).json({sucess:true,user:req.user})
}
export const logout=async (req,res)=>{ 
    
    res.status(200)
    .cookie("token","",{
        expires:new Date(Date.now()),
        SameSite:process.env.NODE_ENV==="development"?"lax":"none",
        secure: process.env.NODE_ENV==="development"?false:true
        })
    .json({sucess:true,message:"user logged out"})
}