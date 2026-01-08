import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Sidebar from "../customer/Sidebar";
import { Outlet } from "react-router-dom";

const AdminProfile = () => {
  
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const [profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/users/get-user`,
          { headers }
        );
        setProfile(res.data.userID);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <Loading />;

  return (
    <div className="md:h-screen bg-white md:pt-16">
      <div className="max-w-7xl mx-auto h-full px-4 py-6">

        {/* FLEX LAYOUT */}
        <div className="md:flex gap-6 h-full">

          {/* SIDEBAR */}
          <div className="w-full md:w-1/5 h-full">
            <Sidebar data={profile} />
          </div>

          {/* OUTLET (SCROLLABLE) */}
          <div className=" flex-1 h-full bg-white border border-gray-100 rounded-2xl shadow-lg overflow-y-auto p-6">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
