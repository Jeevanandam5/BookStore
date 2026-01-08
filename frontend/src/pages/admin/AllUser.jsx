import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail } from "react-icons/fi";
import Loading from "../../components/Loading";

const AllUser = () => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/users/get-all-users`,
          { headers }
        );
        setUsers(res.data.users);
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <section>
      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-6">
        All Users
      </h1>

      {/* USER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-50 rounded-2xl  overflow-hidden border-gray-100 shadow-xl border hover:shadow-2xl p-6 flex items-center gap-4" >
            {/* AVATAR */}
            <img
              src={"https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"}
              alt="avatar"
              className="w-14 h-14 rounded-full border object-cover"
            />

            {/* INFO */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <FiUser />
                {user.userName}
              </h3>

              <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                <FiMail />
                {user.email}
              </p>

              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full border
                  ${user.role === "admin"
                    ? "border-black text-white bg-black"
                    : "border-gray-300 text-gray-600"
                  }`}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllUser;
