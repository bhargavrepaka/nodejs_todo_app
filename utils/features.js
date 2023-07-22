import jwt  from "jsonwebtoken"

export const sendCookie=(user,res,message,statuscode)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)

    res.status(statuscode)
        .cookie("token",token,{
            httpOnly:true,
            maxAge:15*60*1000,
            SameSite:"None",
            secure:true
        })
        .json({
        success:true,
        message

    })

}