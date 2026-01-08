import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [heroIndex, setHeroIndex] = useState(0);

    const heroBooks = [
        {
            image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
        },
        {
            image: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
        },
        {
            image: "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg",
        }
    ];

    // auto change every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroBooks.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="max-w-6xl mx-auto mt-6 overflow-hidden border border-gray-100 shadow-sm ">
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">

                {/* LEFT SIDE - UNCHANGED */}
                <div className="bg-white/95 p-8 md:p-16 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-medium mt-3">
                        Latest Arrivals
                    </h1>

                    <p className="mt-4 text-sm text-gray-600 max-w-md">
                        Enjoy a peaceful browse in our comfortable reading nooks, perhaps with a cup of coffee or tea from our cafe
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                        <Link
                            to="/book-collection"
                            className="inline-block border-b-2 border-gray-800 font-semibold py-1 px-3">
                            SHOP NOW
                        </Link>

                        <div className="flex items-center gap-2 ml-4">
                            {heroBooks.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setHeroIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${heroIndex === idx ? 'bg-gray-800 scale-110' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - BOOK IMAGE ONLY */}
                <div className=" flex items-center justify-center p-3">
                    <img
                        src={heroBooks[heroIndex].image}
                        alt="Featured Book"
                        className="w-40 sm:w-44 md:w-52 lg:w-56 rounded-lg shadow-xl" />
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
