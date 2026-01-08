import express from 'express'
import { addBook , updateBook,deleteBook,getAllBooks,getBookById,getLatestBook} from '../Controller/bookController.js'
import userAuth from '../Middleware/userAuth.js'

const route = express.Router()

route.post("/addbook",userAuth,addBook)
route.put("/updatebook/:bookId",userAuth,updateBook)
route.delete("/delete-book/:bookId",userAuth, deleteBook);
route.get("/get-all-books", getAllBooks);
route.get("/get-latest-books", getLatestBook);
route.get("/get-all-books/:id", getBookById);




export default route