'use client';
import React from 'react';

const Acusense = () => {
    return (
        <div className="pt-20 min-h-screen">
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">AcuSense Technology</h1>
                    <p className="text-xl text-gray-300">AI-powered accurate detection for human and vehicle targets</p>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center">
                        Hikvision AcuSense technology minimizes false alarms triggered by animals, leaves, or other irrelevant objects, ensuring you only receive alerts that matter.
                    </p>
                </div>
            </section>
        </div>
    );
};
export default Acusense;
