import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate()

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get(
                    `${BACKEND_URL}/api/users/get-userCart`,
                    { headers }
                );
                setCartItems(res.data.data); 
            } catch (error) {
                console.error(error.response?.data || error.message);
            }
        };

        fetchCart();
    }, []);


    const handleRemove = async (bookid) => {
        try {
            const res = await axios.put(
                `${BACKEND_URL}/api/users/removeCart/${bookid}`,
                {},
                { headers }
            );

            // instant UI update
            setCartItems((prev) =>
                prev.filter((item) => item._id !== bookid)
            );
            alert(res.data.message)
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Failed to remove item");
        }
    };


    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <FiShoppingCart size={70} className="text-gray-300 mb-6" />

                <h2 className="text-xl font-semibold text-gray-900">
                    Your cart is empty
                </h2>

                <p className="text-sm text-gray-500 mt-2 max-w-sm">
                    Looks like you haven’t added any books yet.
                </p>

                <Link
                    to="/book-collection"
                    className="mt-6 inline-block bg-black text-white px-6 py-3 text-sm rounded-lg hover:bg-gray-900 transition" >
                    Browse Books
                </Link>
            </div>
        );
    }


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price,
        0
    );
    const shipping = 50;
    const total = subtotal + shipping;

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            {/* TITLE */}
            <div className="flex items-center gap-3 mb-8">
                <FiShoppingCart size={22} />
                <h1 className="text-2xl font-semibold tracking-wide">
                    Shopping Cart
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* LEFT - CART ITEMS */}
                <div className="md:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-6 p-5 border rounded-xl bg-white hover:shadow-lg transition"
                        >
                            {/* IMAGE */}
                            <div className="w-24 h-28 flex items-center justify-center bg-gray-50 rounded-lg">
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="h-full object-contain"
                                />
                            </div>

                            {/* DETAILS */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {item.author}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="font-semibold">
                                        ₹{item.price}
                                    </span>

                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="text-gray-400 hover:text-black transition" >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT - TOTALS */}
                <div className="border rounded-xl p-6 h-fit bg-white">
                    <h2 className="text-sm tracking-widest text-gray-500 uppercase mb-6">
                        Cart Totals —
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>₹{shipping}</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <button onClick={() => navigate("/checkout")} className="mt-8 w-full bg-black text-white py-3 text-sm rounded-lg hover:bg-gray-900 transition">
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Cart;
