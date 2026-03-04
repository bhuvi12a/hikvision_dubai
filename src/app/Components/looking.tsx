'use client';

import React from 'react';

const Looking = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">Looking for Security Solutions?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    We provide comprehensive security solutions tailored to your specific needs.
                    Contact us today to discuss your requirements.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                    Get a Free Quote
                </button>
            </div>
        </section>
    );
};

export default Looking;
