'use client';

import React from 'react';

const Banner = () => {
    return (
        <section className="relative h-[600px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Advanced Security Solutions
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Protect what matters most with cutting-edge Hikvision technology
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                        View Products
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Banner;
