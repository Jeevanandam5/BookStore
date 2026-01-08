import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPackage, FiBookOpen } from "react-icons/fi";
import Loading from "../../components/Loading";

const UserOrder = () => {

    const BACKEND_URL =import.meta.env.VITE_BACKEND_URL ||"http://localhost:8000";

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `${BACKEND_URL}/api/users/get-order`,
                    { headers }
                );
                setOrders(res.data.data);
            } catch (error) {
                console.error(error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <Loading />;

    // EMPTY STATE
    if (orders.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <FiPackage size={60} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">
                    No Orders Yet
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                    You haven’t placed any orders yet.
                </p>
            </div>
        );
    }

    return (
        <section className="max-w-5xl mx-auto px-4 py-10">
            {/* TITLE */}
            <div className="flex items-center gap-3 mb-8">
                <FiPackage size={22} />
                <h1 className="text-2xl font-semibold tracking-wide">
                    My Orders
                </h1>
            </div>

            {/* ORDER LIST */}
            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-gray-50 rounded-2xl  overflow-hidden border-gray-100 shadow-xl border hover:shadow-2xl p-6 gap-4">
                        <div className="flex flex-col sm:flex-row gap-6">

                            {/* IMAGE */}
                            <div className="w-24 h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                                <img
                                    src={order.book.url}
                                    alt={order.book.title}
                                    className="h-full object-contain"
                                />
                            </div>

                            {/* DETAILS */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {order.book.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {order.book.author}
                                    </p>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                    <span className="font-semibold text-black">
                                        ₹{order.book.price}
                                    </span>

                                    <span className={`px-4 py-1 text-xs rounded-full border font-medium
                                        ${order.status === "Delivered" ? "bg-green-600 text-white border-green-600"
                                            : order.status === "Canceled" ? "bg-red-600 text-white border-red-600"
                                                : order.status === "Out for Delivery" ? "bg-blue-600 text-white border-blue-600"
                                                    : "bg-yellow-500 text-white border-yellow-500"} `} >
                                        {order.status}
                                    </span>

                                </div>
                            </div>

                            {/* ICON */}
                            <div className="hidden sm:flex items-center">
                                <FiBookOpen className="text-gray-400" size={28} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UserOrder;
