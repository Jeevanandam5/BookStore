import React from "react";
import { Link } from "react-router-dom";

const BookCollection = ({ item }) => {
    return (
        <Link to={`/book-detail/${item._id}`} className="group">
            <div className="border rounded-md overflow-hidden bg-white  transition hover:shadow-2xl">

                {/* IMAGE */}
                <div className="h-40 flex items-center justify-center bg-gray-50">
                    <img
                        src={item.url}
                        alt={item.title}
                        className="h-full object-contain p-3 group-hover:scale-105 transition"
                    />
                </div>

                {/* DETAILS */}
                <div className="p-3 text-center">
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                        {item.title}
                    </h3>

                    {/* PRICE */}
                    <div className="mt-1">
                        <span className="text-sm font-semibold text-gray-900">
                            ₹{item.price}
                        </span>
                    </div>

                    {item.des && (
                        <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                            {item.des}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default BookCollection;
