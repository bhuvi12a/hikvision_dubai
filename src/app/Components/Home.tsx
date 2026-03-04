'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Homepage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [counters, setCounters] = useState({ projects: 0, cameras: 0, clients: 0, support: 0 });

    useEffect(() => {
        setIsVisible(true);

        // Animate counters
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        const targets = { projects: 2500, cameras: 50000, clients: 1200, support: 24 };
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounters({
                projects: Math.round(targets.projects * easeOut),
                cameras: Math.round(targets.cameras * easeOut),
                clients: Math.round(targets.clients * easeOut),
                support: Math.round(targets.support * easeOut),
            });

            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const products = [
        {
            title: 'CCTV Cameras',
            description: 'Ultra HD surveillance cameras with smart detection, night vision, and weatherproof design for any environment.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
            gradient: 'from-red-500 to-rose-600',
        },
        {
            title: 'Access Control',
            description: 'Biometric, card-based, and facial recognition access systems for secure entry management.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            gradient: 'from-blue-500 to-indigo-600',
        },
        {
            title: 'Video Intercom',
            description: 'Smart video door phones and intercom solutions for residential and commercial buildings.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            gradient: 'from-emerald-500 to-teal-600',
        },
        {
            title: 'Alarm Systems',
            description: 'Intelligent intrusion detection with wireless sensors, sirens, and real-time mobile alerts.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            ),
            gradient: 'from-amber-500 to-orange-600',
        },
    ];

    const technologies = [
        {
            name: 'AcuSense',
            description: 'AI-powered human & vehicle classification to reduce false alarms by up to 95%',
            href: '/Acusense',
            icon: '🧠',
            color: 'border-blue-500 bg-blue-50 text-blue-700',
        },
        {
            name: 'ColorVu',
            description: '24/7 vivid color imaging even in complete darkness with advanced sensor technology',
            href: '/Colorvu',
            icon: '🎨',
            color: 'border-purple-500 bg-purple-50 text-purple-700',
        },
        {
            name: 'DarkFighter',
            description: 'Ultra-low light performance delivering clear images in near-zero lux conditions',
            href: '/Darkfighter',
            icon: '🌙',
            color: 'border-indigo-500 bg-indigo-50 text-indigo-700',
        },
        {
            name: 'TandemVu',
            description: 'Dual-lens PTZ cameras providing panoramic and detailed views simultaneously',
            href: '/Tandemvu',
            icon: '👁️',
            color: 'border-teal-500 bg-teal-50 text-teal-700',
        },
        {
            name: 'Smart IP',
            description: 'Intelligent network cameras with built-in analytics and edge computing capabilities',
            href: '/SmartIP',
            icon: '📡',
            color: 'border-rose-500 bg-rose-50 text-rose-700',
        },
    ];

    const solutions = [
        {
            title: 'Retail',
            description: 'Loss prevention, customer analytics, and smart retail security solutions.',
            href: '/Retail',
            image: '/monitoring-setup.png',
            features: ['People Counting', 'Heat Mapping', 'Queue Detection'],
        },
        {
            title: 'Healthcare',
            description: 'Patient safety, pharmacy monitoring, and hospital security systems.',
            href: '/Healthcare',
            image: '/camera-features.png',
            features: ['Patient Monitoring', 'Access Control', 'Emergency Response'],
        },
        {
            title: 'Education',
            description: 'Campus security, classroom monitoring, and safe school environments.',
            href: '/Education',
            image: '/camera-controls.png',
            features: ['Perimeter Security', 'Attendance Tracking', 'Visitor Management'],
        },
        {
            title: 'Manufacturing',
            description: 'Industrial monitoring, safety compliance, and production oversight.',
            href: '/Manufacturing',
            image: '/product-box.png',
            features: ['Process Monitoring', 'Safety Compliance', 'Inventory Tracking'],
        },
    ];

    const testimonials = [
        {
            name: 'Ahmed Al Maktoum',
            role: 'Operations Director, Al Futtaim Group',
            text: 'Hikvision Dubai provided us with a state-of-the-art surveillance system that covers our entire facility. Their AcuSense technology has dramatically reduced false alarms. Outstanding service from start to finish.',
            rating: 5,
        },
        {
            name: 'Sarah Johnson',
            role: 'Mall Manager, Dubai Festival City',
            text: 'The retail analytics from Hikvision cameras have transformed how we understand customer behavior. The heat mapping and people counting features are invaluable for our business decisions.',
            rating: 5,
        },
        {
            name: 'Dr. Rashid Al Nouri',
            role: 'CEO, Dubai Health Clinic',
            text: 'We needed a reliable security solution for our healthcare facilities. Hikvision Dubai delivered beyond expectations — the ColorVu cameras provide crystal clear footage around the clock.',
            rating: 5,
        },
    ];

    const whyChooseUs = [
        {
            title: 'Authorized Distributor',
            description: 'Official Hikvision partner in the UAE with access to the complete product range and exclusive support.',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: 'Expert Installation',
            description: 'Certified engineers with 10+ years of experience in system design, installation, and commissioning.',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            title: '24/7 Support',
            description: 'Round-the-clock technical support team ready to assist with any issues or maintenance needs.',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            title: 'Custom Solutions',
            description: 'Tailored security system designs to match your specific requirements, budget, and infrastructure.',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
            ),
        },
        {
            title: 'Warranty & AMC',
            description: 'Comprehensive warranty packages and annual maintenance contracts for peace of mind.',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Free Site Survey',
            description: 'Complimentary on-site assessment to design the most effective security solution for your premises.',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden">
            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-red-950" />
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-red-400 text-sm font-medium">Authorized Hikvision Partner in UAE</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Professional
                                <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                    Security Solutions
                                </span>
                                in Dubai
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                                Leading provider of cutting-edge Hikvision surveillance systems, access control,
                                and intelligent security solutions for businesses and homes across the UAE.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/Contact"
                                    className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 hover:-translate-y-0.5">
                                    Get Free Consultation
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href="/About"
                                    className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5">
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className={`hidden lg:flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                                    <Image
                                        src="/hero-camera.png"
                                        alt="Hikvision Security Camera"
                                        width={450}
                                        height={400}
                                        className="rounded-2xl"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* ==================== STATS BAR ==================== */}
            <section className="relative -mt-1 bg-gradient-to-r from-red-600 via-red-700 to-red-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
                        <div className="p-4">
                            <div className="text-3xl md:text-4xl font-bold mb-1">{counters.projects.toLocaleString()}+</div>
                            <div className="text-red-200 text-sm font-medium uppercase tracking-wider">Projects Completed</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl md:text-4xl font-bold mb-1">{counters.cameras.toLocaleString()}+</div>
                            <div className="text-red-200 text-sm font-medium uppercase tracking-wider">Cameras Installed</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl md:text-4xl font-bold mb-1">{counters.clients.toLocaleString()}+</div>
                            <div className="text-red-200 text-sm font-medium uppercase tracking-wider">Happy Clients</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl md:text-4xl font-bold mb-1">{counters.support}/7</div>
                            <div className="text-red-200 text-sm font-medium uppercase tracking-wider">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== PRODUCTS SECTION ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Products</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Security Products</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            From surveillance cameras to access control, we offer the complete range of
                            Hikvision security products for every need.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <div key={index}
                                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className={`h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    <div className="text-white/90 transform group-hover:scale-110 transition-transform duration-500">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                            {product.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{product.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
                                    <div className="mt-4 flex items-center text-red-600 font-medium text-sm group-hover:gap-2 transition-all">
                                        <span>Learn More</span>
                                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== ABOUT / TEXT+IMAGE SECTION ==================== */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-blue-100 rounded-3xl blur-xl opacity-60" />
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/monitoring-setup.png"
                                    alt="Hikvision Monitoring Setup"
                                    width={600}
                                    height={450}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {/* Floating badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">10+ Years</div>
                                        <div className="text-sm text-gray-500">Industry Experience</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="inline-block text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">About Us</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Your Trusted Security Partner in Dubai
                            </h2>
                            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                                Hikvision is the world&apos;s leading provider of innovative security products and solutions.
                                With a strong focus on R&D, Hikvision delivers cutting-edge technology that enables
                                organizations to protect their assets and people.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                As an authorized distributor in the UAE, we bring you the full range of
                                Hikvision products with professional installation, configuration, and ongoing support services.
                                Our team of certified engineers ensures your security system is designed and deployed
                                to the highest standards.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {['HD Surveillance', 'AI Analytics', 'Cloud Storage', 'Remote Access'].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/About"
                                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                                Read More About Us
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== TECHNOLOGY SECTION ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">Technology</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powered by Hikvision Innovation</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Industry-leading technologies that set new standards in security and surveillance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {technologies.map((tech, index) => (
                            <Link key={index} href={tech.href}
                                className={`group border-2 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${tech.color}`}>
                                <div className="text-4xl mb-4">{tech.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{tech.name}</h3>
                                <p className="text-sm opacity-80 leading-relaxed">{tech.description}</p>
                                <div className="mt-4 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explore →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== INDUSTRY SOLUTIONS SECTION ==================== */}
            <section className="py-20 bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block text-red-400 font-semibold text-sm uppercase tracking-wider mb-3">Industry Solutions</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tailored for Every Industry</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Specialized security solutions designed for the unique challenges of different industries.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {solutions.map((solution, index) => (
                            <Link key={index} href={solution.href}
                                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-500">
                                <div className="grid grid-cols-1 sm:grid-cols-2">
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">{solution.title}</h3>
                                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">{solution.description}</p>
                                        <ul className="space-y-2">
                                            {solution.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-2 text-gray-300 text-sm">
                                                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 inline-flex items-center gap-2 text-red-400 font-semibold text-sm group-hover:gap-3 transition-all">
                                            View Solution
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="relative h-48 sm:h-auto overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
                                        <Image
                                            src={solution.image}
                                            alt={solution.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== WHY CHOOSE US SECTION ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Clients Trust Us</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            We go beyond selling products — we deliver complete security solutions with unmatched service.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseUs.map((item, index) => (
                            <div key={index}
                                className="group p-8 rounded-2xl border border-gray-100 hover:border-red-100 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-white transition-all duration-300 hover:shadow-lg">
                                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-5 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== TESTIMONIALS SECTION ==================== */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                            {/* Quote icon */}
                            <div className="absolute top-6 left-8 text-red-100">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            <div className="relative">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index}
                                        className={`transition-all duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                                            &ldquo;{testimonial.text}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{testimonial.name}</div>
                                                <div className="text-gray-500 text-sm">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Dots */}
                            <div className="flex justify-center gap-3 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial ? 'bg-red-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CTA / FREE QUOTE SECTION ==================== */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Secure Your Business?
                    </h2>
                    <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                        Get a free, no-obligation site survey and security assessment from our experts.
                        We&apos;ll design a customized solution that fits your needs and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/Contact"
                            className="group inline-flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            Get a Free Quote
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <a href="tel:+971XXXXXXXX"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white hover:text-red-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Us Now
                        </a>
                    </div>
                </div>
            </section>

            {/* ==================== BRANDS / TRUST SECTION ==================== */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">Trusted by Leading Organizations</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
                        {['Hotels & Hospitality', 'Government', 'Banking & Finance', 'Real Estate', 'Oil & Gas', 'Transportation'].map((brand, idx) => (
                            <div key={idx} className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
