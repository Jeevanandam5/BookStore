import express from 'express'
import userAuth from '../Middleware/userAuth.js'
import { placeOrder ,getOrder , getAllOrderByAdmin,updateOrder} from '../Controller/orderController.js'

const route = express.Router()

route.post("/place-order", userAuth, placeOrder);
route.get("/get-order", userAuth, getOrder);
route.get("/get-all-order", userAuth, getAllOrderByAdmin);
route.put("/update-order/:id", userAuth, updateOrder);


export default route

