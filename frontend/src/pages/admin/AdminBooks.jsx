import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AdminBooks = () => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/users/get-all-books`
        );
        setBooks(res.data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <Loading/>
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">
        All Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col"
          >
            {/* IMAGE */}
            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
              <img
                src={book.url}
                alt={book.title}
                className="h-full object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="mt-4 flex-1">
              <h3 className="font-medium text-gray-900">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500">
                {book.author}
              </p>
            </div>

            {/* FOOTER */}
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold">
                ₹{book.price}
              </span>

              <button
                onClick={() =>
                  navigate(`/admin/profile/updatebook/${book._id}`) }
                className="p-2 border rounded-lg hover:bg-black hover:text-white transition">
                <FiEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminBooks;
