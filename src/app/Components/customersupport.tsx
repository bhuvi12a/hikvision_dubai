'use client';

import React from 'react';

const Customersupport = () => {
    return (
        <section className="py-16 bg-red-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">Customer Support</h2>
                <p className="text-red-100 mb-8 max-w-2xl mx-auto">
                    Our dedicated support team is available to help you with installation,
                    configuration, and troubleshooting of all Hikvision products.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Call Us Now
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                        Email Support
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Customersupport;
