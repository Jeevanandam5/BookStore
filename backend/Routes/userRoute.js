import express from "express";
import { signUpuser, signInUser, getUserInfo, updateuser,getAllUsers } from "../Controller/userController.js";
import userAuth from "../Middleware/userAuth.js";
const route = express.Router()

route.post("/signup",signUpuser)
route.post("/signin",signInUser)
route.get("/get-user",userAuth,getUserInfo)
route.put("/update-user",userAuth,updateuser)
route.get("/get-all-users", userAuth, getAllUsers);


export default route