import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const SignUp = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        if(form.userName === "" || form.email === "" || form.password === ""){
            alert("All fields are required");
            return
        } else {
            try {
                const res = await axios.post("http://localhost:8000/api/users/signup",form)
                alert(res.data.message)
                navigate("/login")
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
                    Sign Up —
                </h1>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* NAME */}
                    <input
                        type="text"
                        name="userName"
                        placeholder="Name"
                        value={form.userName}
                        onChange={handleChange}
                        className="w-full  border border-gray-400  px-3 py-2  text-sm  outline-none focus:border-black " />

                    {/* EMAIL */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className=" w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-black" />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-black  " />

                    {/* BUTTON */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className=" mt-6 w-full bg-black text-white py-2 text-sm hover:bg-gray-900 transition " >
                        Create
                    </button>

                </form>

                <p className="mt-6 text-xs text-gray-500">
                    You have an account!{" "}
                    <Link to="/login" className="underline cursor-pointer text-black">
                        LogIn
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
