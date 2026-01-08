import { User } from "../Models/userSchema.js";
import { Book } from "../Models/bookSchema.js";

const addBook = async (req, res) => {
    try {
        // Get admin id from headers
        const { id } = req.headers;

        if (!id) {
            return res.status(400).json({
                message: "User id missing in headers"
            });
        }

        //  Find user
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        //  Admin check
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Can't access admin section"
            });
        }

        //Get book data (FIXED req.body)
        const { url, title, author, price, des, language } = req.body;

        if (!url || !title || !author || !price || !des || !language) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //Create book
        const createBook = new Book({
            url,
            title,
            author,
            price,
            des,
            language
        });
        await createBook.save();

        // Success response
        return res.status(201).json({
            message: "New Book Added",
            book: createBook
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.headers;
        const { bookId } = req.params;

        //Validate admin id
        if (!id) {
            return res.status(400).json({
                message: "User id missing in headers"
            });
        }

        // Find admin
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Admin check
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Can't access admin section"
            });
        }

        // Update existing book (IMPORTANT)
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            {
                $set: req.body
            },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        //Success response
        return res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.headers;
        const { bookId } = req.params;

        // check admin
        const user = await User.findById(id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access only"
            });
        }

        // delete book
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: books.length,
            books
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getLatestBook = async (req, res) => {
    try {
        const books = await Book.find()
            .sort({ createdAt: -1 }).limit(4)

        return res.status(200).json({
            count: books.length,
            book: books
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        let isPurchased = false;

        if (userId) {
            const user = await User.findById(userId).populate({
                path: "orders",
                populate: { path: "book" }
            });

            if (user?.orders?.length > 0) {
                isPurchased = user.orders.some(
                    (order) => order.book?._id.toString() === id
                );
            }
        }

        return res.status(200).json({
            status: "success",
            data: book,
            isPurchased
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};



export { addBook, updateBook, deleteBook, getAllBooks, getBookById, getLatestBook };
