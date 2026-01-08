import React, { useState } from "react";
import axios from "axios";
import { FiBookOpen, FiImage, FiUser, FiDollarSign, FiGlobe } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        des: "",
        language: "",
    });

    const [loading, setLoading] = useState(false);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // =========================
    // HANDLE INPUT CHANGE
    // =========================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // =========================
    // SUBMIT BOOK
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:8000/api/users/addbook",
                form,
                { headers }
            );

            alert(res.data.message);
            navigate("/admin/profile");
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to add book");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-4xl mx-auto">
            {/* TITLE */}
            <h1 className="text-2xl font-semibold mb-8">
                Add New Book
            </h1>

            {/* FORM CARD */}
            <form
                onSubmit={handleSubmit}
                className="bg-white border rounded-2xl shadow-lg p-6 space-y-6"
            >
                {/* IMAGE URL */}
                <div>
                    <label className="label">
                        <FiImage /> Image URL
                    </label>
                    <input
                        name="url"
                        value={form.url}
                        onChange={handleChange}
                        className="input"
                        placeholder="https://image-url.com/book.jpg"
                        required />
                </div>

                {/* TITLE */}
                <div>
                    <label className="label">
                        <FiBookOpen /> Title
                    </label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="input"
                        placeholder="Book title"
                        required
                    />
                </div>

                {/* AUTHOR */}
                <div>
                    <label className="label">
                        <FiUser /> Author
                    </label>
                    <input
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        className="input"
                        placeholder="Author name"
                        required
                    />
                </div>

                {/* PRICE & LANGUAGE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <FiDollarSign /> Price
                        </label>
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            className="input"
                            placeholder="₹ Price"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <FiGlobe /> Language
                        </label>
                        <input
                            name="language"
                            value={form.language}
                            onChange={handleChange}
                            className="input"
                            placeholder="English, Tamil..."
                            required
                        />
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="label">Description</label>
                    <textarea
                        name="des"
                        value={form.des}
                        onChange={handleChange}
                        rows="4"
                        className="input resize-none"
                        placeholder="Book description"
                        required
                    ></textarea>
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-xl text-sm hover:bg-gray-900 transition">
                    {loading ? "Adding Book..." : "Add Book"}
                </button>
            </form>
        </section>
    );
};

export default AddBook;
