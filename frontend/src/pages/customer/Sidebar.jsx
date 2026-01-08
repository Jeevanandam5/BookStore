import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";


const Sidebar = ({ data }) => {

    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role);


    const handleLogout = () => {
        // clear auth data
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("user");

        // redirect to login or home
        navigate("/signup"); // or "/" if you want home
    };

    return (
        <div className="bg-white overflow-hidden border-gray-100 shadow-lg border rounded-2xl  p-10 text-center">

            {/* AVATAR */}
            <div className="flex justify-center mb-4">
                <img
                    src={"https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover border"
                />
            </div>

            {/* USER NAME */}
            <h2 className="text-lg font-semibold text-gray-900">
                {data.userName}
            </h2>

            {/* EMAIL */}
            <p className="text-xs text-gray-500 mt-1">
                {data.email}
            </p>

            {/* DIVIDER */}
            <div className="border-t my-4"></div>

            {/* MENU */}
            {role === "user" && (
                <div className="flex flex-col items-center justify-between space-y-3 text-sm text-gray-700">

                    <Link to="order" className="cursor-pointer hover:bg-gray-500 p-2 w-full rounded-2xl hover:text-white">
                        Orders
                    </Link>

                    <Link to="setting" className="cursor-pointer hover:bg-gray-500 p-2 w-full rounded-2xl hover:text-white">
                        Settings
                    </Link>

                </div>
            )}

            {role === "admin" && (
                <div className="flex flex-col items-center justify-between space-y-3 text-sm text-gray-700">

                    <Link to="allorder" className="cursor-pointer hover:bg-gray-500 p-2 w-full rounded-2xl hover:text-white">
                        All Orders
                    </Link>

                    <Link to="alluser" className="cursor-pointer hover:bg-gray-500 p-2 w-full rounded-2xl hover:text-white">
                        All User's
                    </Link>

                    <Link to="allbooks" className="cursor-pointer hover:bg-gray-500 p-2 w-full rounded-2xl hover:text-white">
                        All Books
                    </Link>

                    <Link to="addbook" className="cursor-pointer hover:bg-gray-500 p-2 w-full rounded-2xl hover:text-white">
                        Add Book
                    </Link>

                </div>
            )}
            <div className="mt-24">
                <button onClick={handleLogout} className="flex justify-center items-center gap-3 cursor-pointer bg-gray-800 p-2 w-full rounded-2xl text-white">
                    Logout
                    <IoLogOutOutline className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
