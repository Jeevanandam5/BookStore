import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    url:{
        type: String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
},{timestamps:true})

export const Book = mongoose.model("book" , bookSchema)