'use client';

import React from 'react';

const About = () => {
    return (
        <div className="pt-20 min-h-screen">
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">About Hikvision Dubai</h1>
                    <p className="text-xl text-gray-300">Your trusted partner for professional security solutions</p>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Hikvision Dubai is a premier provider of security solutions in the UAE.
                            We specialize in delivering cutting-edge surveillance systems, access control,
                            and comprehensive security infrastructure for businesses and organizations.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
