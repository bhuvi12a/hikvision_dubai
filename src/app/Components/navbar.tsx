'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
    image?: string;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    navbarCategory?: {
        _id: string;
        name: string;
        slug: string;
    };
}

interface NavbarCategoryType {
    _id: string;
    name: string;
    slug: string;
    order: number;
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
    const [navbarCategories, setNavbarCategories] = useState<NavbarCategoryType[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [activeNavCategory, setActiveNavCategory] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch categories data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [navRes, catRes, subRes] = await Promise.all([
                    fetch('/api/navbar-categories'),
                    fetch('/api/categories'),
                    fetch('/api/subcategories'),
                ]);
                const navData = await navRes.json();
                const catData = await catRes.json();
                const subData = await subRes.json();

                if (Array.isArray(navData)) setNavbarCategories(navData);
                if (Array.isArray(catData)) setCategories(catData);
                if (Array.isArray(subData)) setSubCategories(subData);

                // Set first navbar category as active by default
                if (Array.isArray(navData) && navData.length > 0) {
                    setActiveNavCategory(navData[0]._id);
                }
            } catch (error) {
                console.error('Error fetching navbar data:', error);
            }
        };
        fetchData();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProductsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsProductsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsProductsOpen(false);
        }, 300);
    };

    // Get categories for a specific navbar category
    const getCategoriesForNav = (navCatId: string) => {
        return categories.filter(
            (cat) => cat.navbarCategory && cat.navbarCategory._id === navCatId
        );
    };

    // Get subcategories for a specific category
    const getSubCategoriesForCategory = (categoryId: string) => {
        return subCategories.filter(
            (sub) => {
                const catId = typeof sub.category === 'object' && sub.category !== null
                    ? (sub.category as any)._id
                    : sub.category;
                return catId === categoryId;
            }
        );
    };

    const activeCategories = activeNavCategory ? getCategoriesForNav(activeNavCategory) : [];
    const activeNavSlug = navbarCategories.find(n => n._id === activeNavCategory)?.slug || '';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold text-red-600">Hikvision Dubai</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Home</Link>

                        {/* Products Mega Menu */}
                        <div
                            ref={dropdownRef}
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href="/products"
                                className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors font-medium"
                            >
                                Products
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>

                            {/* Mega Menu Dropdown */}
                            <div
                                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${isProductsOpen
                                        ? 'opacity-100 visible translate-y-0'
                                        : 'opacity-0 invisible -translate-y-2'
                                    }`}
                                style={{ width: 'max(700px, 60vw)', maxWidth: '900px' }}
                            >
                                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                                    {/* Mega Menu Header */}
                                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Our Products</h3>
                                            <p className="text-red-200 text-sm">Browse our complete range of security solutions</p>
                                        </div>
                                        <Link
                                            href="/products"
                                            className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
                                        >
                                            View All
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>

                                    <div className="flex min-h-[320px]">
                                        {/* Left Panel: Navbar Categories */}
                                        <div className="w-56 bg-gray-50 border-r border-gray-100 py-3">
                                            {navbarCategories.length > 0 ? (
                                                navbarCategories.map((navCat) => (
                                                    <button
                                                        key={navCat._id}
                                                        onMouseEnter={() => setActiveNavCategory(navCat._id)}
                                                        onClick={() => setActiveNavCategory(navCat._id)}
                                                        className={`w-full text-left px-5 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-between group ${activeNavCategory === navCat._id
                                                                ? 'bg-white text-red-600 border-r-2 border-red-600 shadow-sm'
                                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                            }`}
                                                    >
                                                        <span>{navCat.name}</span>
                                                        <svg
                                                            className={`w-4 h-4 transition-transform ${activeNavCategory === navCat._id ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'
                                                                }`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-5 py-4 text-sm text-gray-400">No categories available</div>
                                            )}
                                        </div>

                                        {/* Right Panel: Categories & Subcategories */}
                                        <div className="flex-1 p-6">
                                            {activeCategories.length > 0 ? (
                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {activeCategories.map((cat) => {
                                                        const subs = getSubCategoriesForCategory(cat._id);
                                                        return (
                                                            <div key={cat._id} className="space-y-2">
                                                                <Link
                                                                    href={`/${activeNavSlug}/${cat.slug}`}
                                                                    className="font-semibold text-gray-900 hover:text-red-600 transition-colors text-sm uppercase tracking-wide flex items-center gap-2"
                                                                    onClick={() => setIsProductsOpen(false)}
                                                                >
                                                                    {cat.image && (
                                                                        <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center flex-shrink-0">
                                                                            <img src={cat.image} alt="" className="w-4 h-4 object-contain" />
                                                                        </div>
                                                                    )}
                                                                    {cat.name}
                                                                </Link>
                                                                <div className="w-8 h-0.5 bg-red-100 rounded-full" />
                                                                {subs.length > 0 ? (
                                                                    <ul className="space-y-1">
                                                                        {subs.map((sub) => (
                                                                            <li key={sub._id}>
                                                                                <Link
                                                                                    href={`/${activeNavSlug}/${cat.slug}/${sub.slug}`}
                                                                                    className="text-gray-500 hover:text-red-600 text-sm transition-colors nav-item-hover px-2 py-1 rounded block"
                                                                                    onClick={() => setIsProductsOpen(false)}
                                                                                >
                                                                                    {sub.name}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p className="text-xs text-gray-400 italic">No subcategories</p>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                                    <div className="text-center">
                                                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                        </svg>
                                                        <p>Select a category to browse</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/About" className="text-gray-700 hover:text-red-600 transition-colors font-medium">About</Link>
                        <Link href="/Contact" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Contact</Link>
                        <Link
                            href="/Contact"
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 text-sm"
                        >
                            Get a Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="py-4 border-t space-y-1">
                        <Link href="/" className="block py-3 px-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>

                        {/* Mobile Products Accordion */}
                        <div>
                            <button
                                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                                className="w-full flex items-center justify-between py-3 px-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                            >
                                <span>Products</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? 'max-h-[50vh] overflow-y-auto' : 'max-h-0'}`}>
                                <div className="pl-4 pr-2 pb-2 space-y-1">
                                    <Link
                                        href="/products"
                                        className="block py-2 px-3 text-red-600 font-medium text-sm hover:bg-red-50 rounded-lg transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        → View All Products
                                    </Link>

                                    {navbarCategories.map((navCat) => {
                                        const navCategories = getCategoriesForNav(navCat._id);
                                        return (
                                            <div key={navCat._id}>
                                                <button
                                                    onClick={() => setMobileExpandedCategory(
                                                        mobileExpandedCategory === navCat._id ? null : navCat._id
                                                    )}
                                                    className="w-full flex items-center justify-between py-2 px-3 text-gray-600 hover:text-red-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <span>{navCat.name}</span>
                                                    <svg
                                                        className={`w-3 h-3 transition-transform ${mobileExpandedCategory === navCat._id ? 'rotate-90' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>

                                                <div className={`overflow-hidden transition-all duration-200 ${mobileExpandedCategory === navCat._id ? 'max-h-96' : 'max-h-0'}`}>
                                                    <div className="pl-4 space-y-0.5">
                                                        {navCategories.map((cat) => (
                                                            <div key={cat._id}>
                                                                <Link
                                                                    href={`/${navCat.slug}/${cat.slug}`}
                                                                    className="block py-1.5 px-3 text-gray-500 hover:text-red-600 text-sm rounded transition-colors font-medium"
                                                                    onClick={() => setIsMenuOpen(false)}
                                                                >
                                                                    {cat.name}
                                                                </Link>
                                                                {getSubCategoriesForCategory(cat._id).map((sub) => (
                                                                    <Link
                                                                        key={sub._id}
                                                                        href={`/${navCat.slug}/${cat.slug}/${sub.slug}`}
                                                                        className="block py-1 px-6 text-gray-400 hover:text-red-600 text-xs rounded transition-colors"
                                                                        onClick={() => setIsMenuOpen(false)}
                                                                    >
                                                                        {sub.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <Link href="/About" className="block py-3 px-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                            About
                        </Link>
                        <Link href="/Contact" className="block py-3 px-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </Link>
                        <Link
                            href="/Contact"
                            className="block mt-3 text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Get a Quote
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
