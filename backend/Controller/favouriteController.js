import { User } from "../Models/userSchema.js";
import { Book } from "../Models/bookSchema.js";


const addBookTofavourite = async (req, res) => {
    try {
        const { bookId, id } = req.headers;
        const userData = await User.findById(id);
        const isFavourite = userData.favourites.includes(bookId)
        if (isFavourite) {
            return res.status(200).json({
                message: "Book already in favourites"
            });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookId } })

        return res.status(200).json({
            message: "Book added to favourites successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};



const removeBookTofavourite = async (req, res) => {
    try {
        const { bookId, id } = req.headers;

        const userData = await User.findById(id);

        const isFavourite = userData.favourites.includes(bookId)
        if (isFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } })

        }
        return res.status(200).json({
            message: "Book already in favourites"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const getfavourite = async (req, res) => {
    try {
        const { id } = req.headers;

        const userData = await User.findById(id)
            .populate({
                path: "favourites",
                model: "book"
            });

        return res.status(200).json({
            status: "success",
            count: userData.favourites.length,
            data: userData.favourites
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};



export { addBookTofavourite, removeBookTofavourite, getfavourite }