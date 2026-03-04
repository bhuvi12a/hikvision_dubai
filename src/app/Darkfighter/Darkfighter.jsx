'use client';
import React from 'react';

const Darkfighter = () => {
    return (
        <div className="pt-20 min-h-screen">
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">DarkFighter Technology</h1>
                    <p className="text-xl text-gray-300">Ultra-low light imaging for 24-hour surveillance</p>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center">
                        DarkFighter cameras capture high-quality color images even in extremely low-light environments.
                    </p>
                </div>
            </section>
        </div>
    );
};
export default Darkfighter;
