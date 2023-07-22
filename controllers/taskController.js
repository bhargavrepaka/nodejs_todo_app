import ErrorHandler from "../middleware/error.js"
import {Task} from "../models/task.js"
import jwt from "jsonwebtoken"

export const newTask= async(req,res,next)=>{
    const {title,description}=req.body
    if(!title || !description) return next(new ErrorHandler("need both fields",404))
    await Task.create({
        title,
        description,
        createdAt:new Date(Date.now()),
        user:req.user
    })

    res.status(201)
    .json({
        success:true,
        message:"Task Createdd"
    })
}

export const getMyTasks=async (req,res)=>{
    const userId=req.user._id
    const tasks= await Task.find({user:userId})
    res.status(200)
       .json({
        success:true,
        tasks
    })
}

export const updateTask=async (req,res,next)=>{
    const id = req.params.id
    const task= await Task.findById(id)

    if(!task){return next(new ErrorHandler("No task found to update ",404))}
    
    task.isCompleted=!task.isCompleted
    console.log(task)
    task.save()

    res.status(200)
       .json({
        success:true,
        message:"Task Updated"
    })
}

export const deleteTask=async (req,res,next)=>{
    const id = req.params.id
    const task= await Task.findById(id)

    if(!task){return next(new ErrorHandler("Task Not found",404))}

    console.log(task)
    await task.deleteOne()

    res.status(200)
       .json({
        success:true,
        message:"Task Deleted"
    })
}
