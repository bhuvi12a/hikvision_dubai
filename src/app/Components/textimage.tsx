'use client';

import React from 'react';

const TextImage = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">About Hikvision</h2>
                        <p className="text-gray-600 mb-4">
                            Hikvision is the world&apos;s leading provider of innovative security products and solutions.
                            With a strong focus on R&D, Hikvision delivers cutting-edge technology that enables
                            organizations to protect their assets and people.
                        </p>
                        <p className="text-gray-600">
                            As an authorized distributor in the UAE, we bring you the full range of
                            Hikvision products with professional installation and support services.
                        </p>
                    </div>
                    <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl">
                        {/* Image placeholder */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TextImage;
