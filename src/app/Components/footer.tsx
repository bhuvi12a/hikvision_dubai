'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-red-500">Hikvision Dubai</h3>
                        <p className="text-gray-400 mb-4">
                            Leading provider of professional security solutions in Dubai and the UAE.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-red-400 transition-colors">Home</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-red-400 transition-colors">Products</Link></li>
                            <li><Link href="/About" className="text-gray-400 hover:text-red-400 transition-colors">About Us</Link></li>
                            <li><Link href="/Contact" className="text-gray-400 hover:text-red-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Solutions</h4>
                        <ul className="space-y-2">
                            <li><Link href="/Education" className="text-gray-400 hover:text-red-400 transition-colors">Education</Link></li>
                            <li><Link href="/Healthcare" className="text-gray-400 hover:text-red-400 transition-colors">Healthcare</Link></li>
                            <li><Link href="/Manufacturing" className="text-gray-400 hover:text-red-400 transition-colors">Manufacturing</Link></li>
                            <li><Link href="/Retail" className="text-gray-400 hover:text-red-400 transition-colors">Retail</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>📍 Dubai, United Arab Emirates</li>
                            <li>📧 info@hikvisiondubai.ae</li>
                            <li>📞 +971509893134</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Hikvision Dubai. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-500 hover:text-red-400 text-sm">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-500 hover:text-red-400 text-sm">Terms of Service</Link>
                        <Link href="/cookies" className="text-gray-500 hover:text-red-400 text-sm">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
