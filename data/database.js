import mongoose from "mongoose";

export const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"backendApi"
    }).then(c=>console.log(`Database Connected with ${c.connection.host}`))
    .catch(err=>console.log(err))
}
