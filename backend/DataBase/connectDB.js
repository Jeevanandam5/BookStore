import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongDB connected successfully")
    } catch (error) {
        console.log("Connection Faile",error)
    }
}

export default connectDB