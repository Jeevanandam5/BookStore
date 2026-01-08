import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPackage } from "react-icons/fi";
import Loading from "../../components/Loading";

const Allorders = () => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

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
          `${BACKEND_URL}/api/users/get-all-order`,
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


  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/users/update-order/${orderId}`,
        { status },
        { headers }
      );

      // update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <section>
      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-6">
        All Orders
      </h1>

      {/* ORDER LIST */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-50 rounded-2xl  overflow-hidden border-gray-100 shadow-xl border hover:shadow-2xl p-5 gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between  gap-4">

              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-gray-50 rounded-lg flex items-center justify-center">
                  <img
                    src={order.book.url}
                    alt={order.book.title}
                    className="h-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-medium">
                    {order.book.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {order.user.userName} • {order.user.email}
                  </p>
                  <span className="text-sm font-semibold">
                    ₹{order.book.price}
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <FiPackage className="text-gray-400" />

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option>Order Placed</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                  <option>Canceled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Allorders;
