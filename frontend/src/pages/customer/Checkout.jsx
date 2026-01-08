import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import React from 'react'

const CheckOut = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // fetch cart
    useEffect(() => {
        const fetchCart = async () => {
            const res = await axios.get(
                `${BACKEND_URL}/api/users/get-userCart`,
                { headers }
            );
            setCartItems(res.data.data);
        };
        fetchCart();
    }, []);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shipping = 0;
    const total = subtotal + shipping;

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
            console.error(error.response?.data || error.message);
            alert("Order failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LEFT — DELIVERY INFO */}
                <div className="lg:col-span-2">
                    <h2 className="text-sm font-semibold tracking-widest text-gray-500 mb-6">
                        DELIVERY INFORMATION —
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="input" placeholder="First name" />
                        <input className="input" placeholder="Last name" />
                        <input className="input md:col-span-2" placeholder="Email address" />
                        <input className="input md:col-span-2" placeholder="Street" />
                        <input className="input" placeholder="City" />
                        <input className="input" placeholder="State" />
                        <input className="input" placeholder="Zip code" />
                        <input className="input" placeholder="Country" />
                        <input className="input md:col-span-2" placeholder="Phone" />
                    </div>
                </div>

                {/* RIGHT — SUMMARY */}
                <div className="border rounded-xl p-6 bg-white h-fit">
                    <h2 className="text-sm font-semibold tracking-widest text-gray-500 mb-6">
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

                    {/* PAYMENT METHOD */}
                    <h2 className="text-sm font-semibold tracking-widest text-gray-500 mt-10 mb-4">
                        PAYMENT METHOD —
                    </h2>

                    <label className="flex items-center gap-4 border-2 border-black rounded-xl px-4 py-3 cursor-pointer bg-gray-50">

                        {/* CHECKBOX */}
                        <input
                            type="checkbox"
                            checked
                            readOnly
                            className="w-4 h-4 accent-black" />

                        {/* ICON */}
                        <FaMoneyBillWave className="text-green-600" size={22} />

                        {/* TEXT */}
                        <span className="text-sm font-medium text-gray-900">
                            Cash on Delivery
                        </span>
                    </label>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="mt-8 w-full flex items-center justify-center gap-2 bg-black text-white py-3 text-sm rounded-lg hover:bg-gray-900 transition">
                        <FiShoppingBag />
                        {loading ? "Placing Order..." : "PLACE ORDER"}
                    </button>
                </div>
            </div>
        </section>
    );
};


export default CheckOut
