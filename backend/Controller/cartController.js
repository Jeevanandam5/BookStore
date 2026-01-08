import { User } from "../Models/userSchema.js";
import { Book } from "../Models/bookSchema.js";


const addBookToCart = async (req, res) => {
    try {
        const { id } = req.headers;
        const { bookid } = req.params;

        const userData = await User.findById(id)
            .populate({
                path: "orders",
                populate: { path: "book" }
            });

        // ALREADY PURCHASED CHECK
        const alreadyPurchased = userData.orders.some(
            (order) => order.book._id.toString() === bookid
        );

        if (alreadyPurchased) {
            return res.status(400).json({
                message: "You already purchased this book",
                isPurchased: true
            });
        }

        // ALREADY IN CART CHECK
        const alreadyInCart = userData.cart.some(
            (item) => item.toString() === bookid
        );

        if (alreadyInCart) {
            return res.status(200).json({
                message: "Book already in Cart",
                alreadyInCart: true
            });
        }

        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid }
        });

        return res.status(200).json({
            message: "Book added to Cart successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const removeFromCart = async (req, res) => {

    try {

        const { id } = req.headers;
        const { bookid } = req.params;
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid }
        })

        return res.status(200).json({
            status: "success",
            message: "Book Remove to Cart successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const getUserCart = async (req, res) => {
    try {
        const { id } = req.headers;

        const userData = await User.findById(id)
            .populate({
                path: "cart",
            });
        const cart = userData.cart.reverse()
        return res.status(200).json({
            status: "success",
            count: cart.length,
            data: cart
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export { addBookToCart, removeFromCart, getUserCart }