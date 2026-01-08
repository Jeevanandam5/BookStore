import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // FETCH CART
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

    // REMOVE ITEM
    const handleRemove = async (bookid) => {
        try {
            const res = await axios.put(
                `${BACKEND_URL}/api/users/removeCart/${bookid}`,
                {},
                { headers }
            );

            setCartItems((prev) =>
                prev.filter((item) => item._id !== bookid)
            );

            alert(res.data.message);
        } catch (error) {
            alert("Failed to remove item");
        }
    };

    // PLACE ORDER
    const handlePlaceOrder = async () => {
        try {
            setLoading(true);

            const orderPayload = {
                order: cartItems.map((item) => ({
                    _id: item._id,
                })),
            };

            const res = await axios.post(
                `${BACKEND_URL}/api/users/place-order`,
                orderPayload,
                { headers }
            );

            alert(res.data.message);
            navigate("/profile/order");
        } catch (error) {
            alert("Order failed");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <FiShoppingCart size={70} className="text-gray-300 mb-6" />
                <h2 className="text-xl font-semibold text-gray-900">
                    Your cart is empty
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                    Looks like you haven’t added any books yet.
                </p>
                <Link
                    to="/book-collection"
                    className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
                >
                    Browse Books
                </Link>
            </div>
        );
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LEFT — CART + DELIVERY */}
                <div className="lg:col-span-2 space-y-10">

                    {/* CART ITEMS */}
                    <div className="space-y-6">
                        <h1 className="text-2xl font-semibold flex items-center gap-2">
                            <FiShoppingCart /> Shopping Cart
                        </h1>

                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex gap-6 p-5 border rounded-xl bg-white"
                            >
                                <div className="w-24 h-28 bg-gray-50 rounded-lg flex items-center justify-center">
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="h-full object-contain"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-medium">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.author}</p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">₹{item.price}</span>
                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="text-gray-400 hover:text-black"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DELIVERY INFO */}
                    <div>
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 mb-6">
                            DELIVERY INFORMATION —
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="input" placeholder="First name" />
                            <input className="input" placeholder="Last name" />
                            <input className="input md:col-span-2" placeholder="Email" />
                            <input className="input md:col-span-2" placeholder="Street" />
                            <input className="input" placeholder="City" />
                            <input className="input" placeholder="State" />
                            <input className="input" placeholder="Zip code" />
                            <input className="input" placeholder="Country" />
                            <input className="input md:col-span-2" placeholder="Phone" />
                        </div>
                    </div>
                </div>

                {/* RIGHT — TOTALS + PAYMENT */}
                <div className="border rounded-xl p-6 bg-white h-fit">
                    <h2 className="text-sm tracking-widest text-gray-500 mb-6">
                        CART TOTALS —
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <h2 className="text-sm tracking-widest text-gray-500 mt-10 mb-4">
                        PAYMENT METHOD —
                    </h2>

                    <label className="flex items-center gap-4 border-2 border-black rounded-xl px-4 py-3 bg-gray-50">
                        <input type="checkbox" checked readOnly className="accent-black" />
                        <FaMoneyBillWave className="text-green-600" size={22} />
                        <span className="text-sm font-medium">Cash on Delivery</span>
                    </label>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="mt-8 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
                    >
                        <FiShoppingBag />
                        {loading ? "Placing Order..." : "PLACE ORDER"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Cart;
