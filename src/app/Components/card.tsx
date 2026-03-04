'use client';

import React from 'react';

const Card = () => {
    const products = [
        { title: 'CCTV Cameras', description: 'High-definition surveillance cameras for every need' },
        { title: 'Access Control', description: 'Advanced access control and door management systems' },
        { title: 'Video Intercom', description: 'Smart video intercom solutions for buildings' },
        { title: 'Alarm Systems', description: 'Comprehensive alarm and intrusion detection systems' },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-48 bg-gradient-to-br from-red-500 to-red-700"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                <p className="text-gray-600">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Card;
