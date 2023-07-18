import mongoose from "mongoose";

export const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"backendApi"
    }).then(c=>console.log("Database Connected"))
    .catch(err=>console.log(err))
}
