import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiCheckCircle, FiShoppingCart } from "react-icons/fi";
import { TbLogin } from "react-icons/tb";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isPurchased, setIsPurchased] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role)

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    };


    useEffect(() => {
        const fetchBook = async () => {
            const res = await axios.get(`http://localhost:8000/api/users/get-all-books/${id}`, { headers });
            setBook(res.data.data);
            setIsPurchased(res.data.isPurchased);
        };
        fetchBook();
    }, [id]);

    if (!book) {
        return (
            <Loading />
        );
    }

    const handletoAddCart = async () => {
        try {
            const res = await axios.put(
                `http://localhost:8000/api/users/addToCart/${id}`,
                {},
                { headers }
            );

            alert(res.data.message);

            if (res.data.isPurchased) {
                setIsPurchased(true);
            }

        } catch (error) {
            alert(error.response?.data?.message || "Failed to add book");
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">

                {/* LEFT SIDE - IMAGE */}
                <div className="relative bg-gray-50 rounded-2xl overflow-hidden border-gray-100 shadow-xl border hover:shadow-2xl p-10 text-center">

                    {/* SOLD BADGE */}
                    {isPurchased == true && (
                        <div className="absolute top-3 left-4 bg-green-400/90 text-white text-xs px-4 py-1 rounded-full shadow-lg tracking-widest">
                            ALREADY SOLD
                        </div>
                    )}

                    <img
                        src={book.url}
                        alt={book.title}
                        className="md:w-96 object-contain mx-auto"
                    />
                </div>

                {/* RIGHT SIDE - DETAILS */}
                <div className="flex flex-col md:mt-20">

                    <h1 className="text-3xl font-semibold text-gray-900">
                        {book.title}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        by <span className="font-medium">{book.author}</span> •{" "}
                        <span>{book.language}</span>
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-2xl font-bold text-black">
                            ₹{book.price}
                        </span>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-gray-900 uppercase tracking-wide">
                            Description
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            {book.des}
                        </p>
                    </div>

                    {/* ADD TO CART / PURCHASE STATUS */}
                    {!isLoggedIn ? (

                        <Link
                            to="/signup"
                            className="mt-8 shadow-lg hover:shadow-2xl rounded-2xl w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-950 transition" >
                            Sign In First
                            <TbLogin size={18} />
                        </Link>
                    ) : isPurchased ? (

                        <button
                            disabled
                            className="mt-8 w-full sm:w-auto px-6 py-3 rounded-2xl bg-green-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow cursor-not-allowed">
                            <FiCheckCircle size={18} />
                            Already Purchased
                        </button>
                    ) : role === "user" ? (

                        <button
                            onClick={handletoAddCart}
                            className="mt-8 shadow-lg hover:shadow-2xl rounded-2xl w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-950 transition" >
                            <FiShoppingCart size={18} />
                            Add to Cart
                        </button>
                    ) : null}


                </div>
            </div>
        </section>
    );
};

export default BookDetails;
