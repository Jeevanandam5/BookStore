import express from 'express'
import { addBookTofavourite,removeBookTofavourite,getfavourite } from '../Controller/favouriteController.js'
import userAuth from '../Middleware/userAuth.js'

const route = express.Router()

route.put("/addbook-to-favourite/:bookId",userAuth,addBookTofavourite)
route.put("/remove-to-favourite/:bookId",userAuth,removeBookTofavourite)
route.get("/getfavourite-book",userAuth,getfavourite)

export default route