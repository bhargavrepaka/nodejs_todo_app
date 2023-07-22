import express from "express";
import {config} from 'dotenv'
import { connectDb } from "./data/database.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors"

const app=express()
config({
    path:"./data/config.env"
})


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:["*","http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))



connectDb()

app.get("/",(req,res)=>{
    res.json({
        running:true
    })
})
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)

app.listen(process.env.PORT,()=>{
    console.log("Listing to server on",process.env.PORT," in ",process.env.NODE_ENV," mode")
})

app.use(errorMiddleware)