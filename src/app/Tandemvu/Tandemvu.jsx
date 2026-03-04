'use client';
import React from 'react';

const Tandemvu = () => {
    return (
        <div className="pt-20 min-h-screen">
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">TandemVu Technology</h1>
                    <p className="text-xl text-gray-300">Panoramic and detail views in a single camera</p>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center">
                        TandemVu provides both panoramic overview and close-up detail simultaneously.
                    </p>
                </div>
            </section>
        </div>
    );
};
export default Tandemvu;
