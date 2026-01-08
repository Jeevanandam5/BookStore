import { Book } from "../Models/bookSchema.js";
import { Order } from "../Models/orderSchema.js";
import { User } from "../Models/userSchema.js";

const placeOrder = async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        if (!id) {
            return res.status(401).json({ message: "User ID missing" });
        }

        const user = await User.findById(id);
        const orderIds = [];

        for (const item of order) {

            // check existing order
            let existingOrder = await Order.findOne({
                user: id,
                book: item._id
            });

            if (existingOrder) {
                //  ORDERS CONTAINS THIS ORDER
                if (!user.orders.includes(existingOrder._id)) {
                    user.orders.push(existingOrder._id);
                }
                continue;
            }

            // create new order
            const newOrder = new Order({
                user: id,
                book: item._id
            });

            const savedOrder = await newOrder.save();
            orderIds.push(savedOrder._id);
            user.orders.push(savedOrder._id);
        }

        //  CLEAR CART & SAVE USER
        user.cart = [];
        await user.save();

        return res.status(200).json({
            status: "success",
            message: "Order Placed Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};




const getOrder = async (req, res) => {
    try {
        const { id } = req.headers;

        const userData = await User.findById(id)
            .populate({
                path: "orders",
                populate: {
                    path: "book"
                }
            });
        const orderData = userData.orders.reverse()
        return res.status(200).json({
            status: "success",
            count: orderData.length,
            data: orderData
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllOrderByAdmin = async (req, res) => {
    try {
        const userData = await Order.find().populate({
            path: "book"
        }).populate({
            path: "user"
        }).sort({
            createdAt: -1
        })
        return res.status(200).json({
            status: "success",
            data: userData
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, {
            status: req.body.status
        })
        return res.status(200).json({
            status: "success",
            message: "Updated Order successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
export { placeOrder, getOrder, getAllOrderByAdmin, updateOrder }



