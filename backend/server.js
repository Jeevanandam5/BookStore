import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './DataBase/connectDB.js'
import userRoute from './Routes/userRoute.js'
import bookRoute from './Routes/bookRoute.js'
import favouriteRoute from './Routes/favouriteRoute.js'
import cartRouter from './Routes/cartRoute.js'
import orderRoute from './Routes/orderRouter.js'

const app = express()
const Port = 8000
app.use(cors())
dotenv.config()
app.use(express.json())
connectDB()

app.use("/api/users",userRoute)
app.use("/api/users",bookRoute)
app.use("/api/users",favouriteRoute)
app.use("/api/users",cartRouter)
app.use("/api/users",orderRoute)



app.listen(Port,()=>{
    console.log(`Server is running ${Port}`)
})