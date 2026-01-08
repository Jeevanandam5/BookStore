import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();


    // simple auth check
    // const token = localStorage.getItem("token");
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    console.log(isLoggedIn)

    return (
        <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 hover:scale-105 transition-transform"
                    >
                        <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                            <span className="font-extrabold text-xl text-[#111827]">B</span>
                        </div>
                        <span className="text-2xl sm:text-3xl font-Outfit font-medium text-[#111827]">
                            BookStore
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <nav className="hidden md:flex md:space-x-8 md:items-center">
                        <Link to="/" className="text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900">Home</Link>
                        <Link to="/book-collection" className="text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900">All Collection</Link>
                        <Link to="/" className="text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900">About</Link>
                        <Link to="/" className="text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900">Contact</Link>
                    </nav>

                    {/* RIGHT SIDE */}
                    <div className="hidden md:flex items-center gap-8">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    to="/login"
                                    className="px-3 py-2 border rounded text-sm bg-gray-50 hover:bg-gray-100" >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="px-3 py-2 border rounded text-sm bg-black text-white hover:bg-gray-800" >
                                    SignUp
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* CART ICON */}
                                <Link
                                    to="/cart"
                                    className="relative text-gray-700 hover:text-black" >
                                    <FiShoppingCart size={22} />
                                </Link>

                                {/* PROFILE / ADMIN */}
                                {role === "admin" ? (
                                    <Link
                                        to="/admin/profile"
                                        className="flex items-center gap-2 text-gray-700 hover:text-black">
                                        <FiUser size={22} />
                                        <span className=" font-semibold text-gray-950">
                                            Admin
                                        </span>
                                    </Link>
                                ) : (
                                    <Link
                                        to="/profile"
                                        className="text-gray-700 hover:text-black">
                                        <FiUser size={22} />
                                    </Link>
                                )}
                            </>
                        )}
                    </div>


                    {/* MOBILE MENU ICON */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* MOBILE MENU */}
                {menuOpen && (
                    <div className=" md:hidden py-4 space-y-4">
                        <button onClick={() => { navigate('/'); setMobileOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-gray-50">Home</button>
                        <button onClick={() => { navigate('/book-collection'); setMobileOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-gray-50">Collection</button>
                        <button onClick={() => { navigate('/'); setMobileOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-gray-50">About</button>
                        <button onClick={() => { navigate('/'); setMobileOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-gray-50">Contact</button>

                        <div className="pt-3 border-t flex gap-4">
                            {!isLoggedIn ? (
                                <>
                                    <Link to="/login" className="w-full text-center px-3 py-2 border rounded text-sm">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="w-full text-center px-3 py-2 border rounded text-sm bg-black text-white">
                                        SignUp
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/cart" className="flex items-center gap-2 text-gray-700">
                                        <FiShoppingCart /> Cart
                                    </Link>
                                    <Link to="/profile" className="flex items-center gap-2 text-gray-700">
                                        <FiUser /> Profile
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
