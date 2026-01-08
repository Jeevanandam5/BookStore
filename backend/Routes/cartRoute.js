import express from 'express'
import { addBookToCart,removeFromCart,getUserCart} from '../Controller/cartController.js'
import userAuth from '../Middleware/userAuth.js'

const route = express.Router()

route.put("/addToCart/:bookid",userAuth,addBookToCart)
route.put("/removeCart/:bookid",userAuth,removeFromCart)
route.get("/get-userCart",userAuth,getUserCart)



export default route