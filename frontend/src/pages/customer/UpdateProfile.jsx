import React, { useState } from "react";
import axios from "axios";
import { FiUser, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [userName, setUserName] = useState(user?.userName);
    const [loading, setLoading] = useState(false);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const handleUpdate = async () => {
        if (!userName.trim()) return alert("Username required");

        try {
            setLoading(true);
            const res = await axios.put(
                "http://localhost:8000/api/users/update-user",
                { userName },
                { headers }
            );

            // update local storage
            localStorage.setItem(
                "user",
                JSON.stringify({ ...user, userName })
            );

            alert(res.data.message);

            // redirect back to settings
            navigate("/admi/profile/");
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold mb-8">
                Update Profile
            </h1>

            <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-6">
                <div>
                    <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                        <FiUser />
                        Username
                    </label>
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-black outline-none"
                    />
                </div>

                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm rounded-lg hover:bg-gray-900 transition" >
                    <FiSave />
                    {loading ? "Updating..." : "Save Changes"}
                </button>
            </div>
        </section>
    );
};

export default UpdateProfile;
