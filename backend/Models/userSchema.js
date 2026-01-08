import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "book"
        }
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "book"
        },
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order"
        }
    ]
}, { timestamps: true })

export const User = mongoose.model("user", userSchema)
