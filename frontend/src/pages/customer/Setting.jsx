import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Setting = () => {

    const BACKEND_URL =import.meta.env.VITE_BACKEND_URL ||"http://localhost:8000";

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${BACKEND_URL}/api/users/get-user`,
                    { headers }
                );
                setUser(res.data.userID); // 
            } catch (error) {
                console.error(error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading || !user) return <Loading />;

    return (
        <section className="max-w-3xl mx-auto">
            {/* TITLE */}
            <h1 className="text-2xl font-semibold mb-8">
                Account Settings
            </h1>

            {/* PROFILE CARD */}
            <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-6">

                {/* AVATAR + BASIC INFO */}
                <div className="flex flex-col  sm:flex-row items-center gap-6">
                    <img
                        src={"https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"}
                        alt="avatar"
                        className="w-24 h-24 rounded-full border object-cover" />

                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {user.userName}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* USER DETAILS */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <FiUser className="text-gray-400" />
                        <span className="text-sm">
                            <b>Username:</b> {user.userName}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FiMail className="text-gray-400" />
                        <span className="text-sm">
                            <b>Email:</b> {user.email}
                        </span>
                    </div>
                </div>

                {/* UPDATE BUTTON */}
                <button
                    onClick={() => navigate("/profile/setting/update")}
                    className="mt-6 inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm rounded-lg hover:bg-gray-900 transition"
                >
                    <FiEdit />
                    Update Profile
                </button>
            </div>
        </section>
    );
};

export default Setting;
