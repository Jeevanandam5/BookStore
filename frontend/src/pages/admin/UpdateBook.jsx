import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        author: "",
        price: "",
        language: "",
        des: "",
        url: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // FETCH BOOK BY ID
    useEffect(() => {
        const fetchBook = async () => {
            const res = await axios.get(
                `http://localhost:8000/api/users/get-all-books/${id}`
            );
            setForm(res.data.data);
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:8000/api/users/updatebook/${id}`,
                form,
                { headers }
            );
            alert("Book updated successfully");
            navigate("/admin/profile/allbooks");
        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };

    return (
        <section className="max-w-3xl">
            <h1 className="text-2xl font-semibold mb-6">
                Update Book
            </h1>

            <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="input"
                    placeholder="Title"
                />
                <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    className="input"
                    placeholder="Author"
                />
                <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="input"
                    placeholder="Price"
                />
                <input
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="input"
                    placeholder="Language"
                />
                <input
                    name="url"
                    value={form.url}
                    onChange={handleChange}
                    className="input"
                    placeholder="Image URL"
                />
                <textarea
                    name="des"
                    value={form.des}
                    onChange={handleChange}
                    className="input resize-none"
                    rows="4"
                    placeholder="Description" />

                <button
                    onClick={handleUpdate}
                    className="bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-gray-900 transition">
                    Update Book
                </button>
            </div>
        </section>
    );
};

export default UpdateBook;
