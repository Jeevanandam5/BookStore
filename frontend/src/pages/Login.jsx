import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
    const [form, setForm] = useState({
        userName: "",
        password: ""
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.userName === "" || form.password === "") {
            alert("All fields are required");
            return
        } else {
            try {
                const res = await axios.post("http://localhost:8000/api/users/signin", form)
                
                // localStorage update
                dispatch(authActions.login())
                dispatch(authActions.changeRole(res.data.role))
                localStorage.setItem("id",res.data.id)
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("role",res.data.role)

                navigate("/")

            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div className="mt-32 flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm text-center">

                {/* TITLE */}
                <h1 className="text-2xl font-light text-gray-900 mb-8">
                    Login —
                </h1>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* EMAIL */}
                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={form.userName}
                        onChange={handleChange}
                        className=" w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-black " />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="  w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-black" />

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="  mt-6 w-full bg-black text-white py-2 text-sm hover:bg-gray-900 transition ">
                        Login
                    </button>

                </form>

                <p className="mt-6 text-xs text-gray-500">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="underline cursor-pointer text-black">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
