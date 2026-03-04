'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string | { _id: string };
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

interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    price?: number;
    images: string[];
    category?: {
        _id: string;
        name: string;
        slug: string;
    };
    subCategory?: {
        _id: string;
        name: string;
        slug: string;
    };
    isFeatured: boolean;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [navbarCategories, setNavbarCategories] = useState<NavbarCategoryType[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNavCategory, setSelectedNavCategory] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, navRes, catRes, subRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/navbar-categories'),
                    fetch('/api/categories'),
                    fetch('/api/subcategories'),
                ]);
                const prodData = await prodRes.json();
                const navData = await navRes.json();
                const catData = await catRes.json();
                const subData = await subRes.json();

                if (Array.isArray(prodData)) setProducts(prodData);
                if (Array.isArray(navData)) setNavbarCategories(navData);
                if (Array.isArray(catData)) setCategories(catData);
                if (Array.isArray(subData)) setSubCategories(subData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter categories based on selected navbar category
    const filteredCategories = selectedNavCategory === 'all'
        ? categories
        : categories.filter(cat => cat.navbarCategory?._id === selectedNavCategory);

    // Filter subcategories based on selected category
    const filteredSubCategories = selectedCategory === 'all'
        ? subCategories
        : subCategories.filter(sub => {
            const catId = typeof sub.category === 'object' && sub.category !== null
                ? (sub.category as any)._id
                : sub.category;
            return catId === selectedCategory;
        });

    // Filter products
    const filteredProducts = products.filter(product => {
        if (selectedNavCategory !== 'all' && product.category) {
            const catData = categories.find(c => c._id === product.category?._id);
            if (!catData || catData.navbarCategory?._id !== selectedNavCategory) return false;
        }
        if (selectedCategory !== 'all' && product.category?._id !== selectedCategory) return false;
        if (selectedSubCategory !== 'all' && product.subCategory?._id !== selectedSubCategory) return false;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                product.name.toLowerCase().includes(term) ||
                product.description?.toLowerCase().includes(term) ||
                product.category?.name.toLowerCase().includes(term) ||
                product.subCategory?.name.toLowerCase().includes(term)
            );
        }
        return true;
    });

    const getProductLink = (product: Product) => {
        if (product.category && product.subCategory) {
            const cat = categories.find(c => c._id === product.category?._id);
            const navSlug = cat?.navbarCategory?.slug || 'products';
            return `/${navSlug}/${product.category.slug}/${product.subCategory.slug}/${product.slug}`;
        }
        return `/products`;
    };

    return (
        <div>
            <Navbar />
            <div className="pt-16 min-h-screen bg-gray-50">
                {/* Hero Banner */}
                <section className="relative overflow-hidden" style={{ minHeight: '400px' }}>
                    {/* Banner Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src="/products-banner.png"
                            alt="Hikvision Products Banner"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-900/60 to-transparent" />
                    </div>

                    {/* Banner Content */}
                    <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-red-400 text-sm font-medium">Complete Product Range</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Our <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Products</span>
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed">
                                Explore our comprehensive range of Hikvision security cameras, access control systems,
                                and intelligent surveillance solutions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters & Content */}
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Sidebar Filters */}
                        <aside className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-20">
                                <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filters
                                </h3>

                                {/* Search */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Search</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                        />
                                        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Navbar Category Filter */}
                                {navbarCategories.length > 0 && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Product Line</label>
                                        <div className="space-y-1">
                                            <button
                                                onClick={() => { setSelectedNavCategory('all'); setSelectedCategory('all'); setSelectedSubCategory('all'); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedNavCategory === 'all'
                                                    ? 'bg-red-50 text-red-600 font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                All Product Lines
                                            </button>
                                            {navbarCategories.map((navCat) => (
                                                <button
                                                    key={navCat._id}
                                                    onClick={() => { setSelectedNavCategory(navCat._id); setSelectedCategory('all'); setSelectedSubCategory('all'); }}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedNavCategory === navCat._id
                                                        ? 'bg-red-50 text-red-600 font-semibold'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {navCat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Category Filter */}
                                {filteredCategories.length > 0 && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
                                        <div className="space-y-1">
                                            <button
                                                onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === 'all'
                                                    ? 'bg-red-50 text-red-600 font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                All Categories
                                            </button>
                                            {filteredCategories.map((cat) => (
                                                <button
                                                    key={cat._id}
                                                    onClick={() => { setSelectedCategory(cat._id); setSelectedSubCategory('all'); }}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat._id
                                                        ? 'bg-red-50 text-red-600 font-semibold'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* SubCategory Filter */}
                                {filteredSubCategories.length > 0 && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Subcategory</label>
                                        <div className="space-y-1">
                                            <button
                                                onClick={() => setSelectedSubCategory('all')}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedSubCategory === 'all'
                                                    ? 'bg-red-50 text-red-600 font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                All Subcategories
                                            </button>
                                            {filteredSubCategories.map((sub) => (
                                                <button
                                                    key={sub._id}
                                                    onClick={() => setSelectedSubCategory(sub._id)}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedSubCategory === sub._id
                                                        ? 'bg-red-50 text-red-600 font-semibold'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {sub.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Clear Filters */}
                                {(selectedNavCategory !== 'all' || selectedCategory !== 'all' || selectedSubCategory !== 'all' || searchTerm) && (
                                    <button
                                        onClick={() => {
                                            setSelectedNavCategory('all');
                                            setSelectedCategory('all');
                                            setSelectedSubCategory('all');
                                            setSearchTerm('');
                                        }}
                                        className="w-full text-center py-2.5 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors border border-red-200"
                                    >
                                        ✕ Clear All Filters
                                    </button>
                                )}
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <main className="lg:col-span-3">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-sm">
                                    Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                /* Loading State */
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                                            <div className="h-52 bg-gray-200" />
                                            <div className="p-5 space-y-3">
                                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                                <div className="h-3 bg-gray-200 rounded w-full" />
                                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                /* Empty State */
                                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <svg className="w-20 h-20 mx-auto text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                                    <p className="text-gray-500 mb-6">
                                        {searchTerm
                                            ? `No products match "${searchTerm}". Try a different search term.`
                                            : 'No products available in this category. Try adjusting your filters.'}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSelectedNavCategory('all');
                                            setSelectedCategory('all');
                                            setSelectedSubCategory('all');
                                            setSearchTerm('');
                                        }}
                                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                                    >
                                        View All Products
                                    </button>
                                </div>
                            ) : viewMode === 'grid' ? (
                                /* Grid View */
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <Link
                                            key={product._id}
                                            href={getProductLink(product)}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                            {/* Product Image */}
                                            <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                                                {product.images && product.images.length > 0 ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                {product.isFeatured && (
                                                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            {/* Product Info */}
                                            <div className="p-5">
                                                {product.category && (
                                                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                                        {product.category.name}
                                                    </span>
                                                )}
                                                <h3 className="text-base font-bold text-gray-900 mt-2 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                {product.description && (
                                                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
                                                )}
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                    {product.price ? (
                                                        <span className="text-lg font-bold text-gray-900">
                                                            AED {product.price.toLocaleString()}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">Contact for price</span>
                                                    )}
                                                    <span className="text-red-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        View
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                /* List View */
                                <div className="space-y-4">
                                    {filteredProducts.map((product) => (
                                        <Link
                                            key={product._id}
                                            href={getProductLink(product)}
                                            className="group flex bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="relative w-48 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                                                {product.images && product.images.length > 0 ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                {product.isFeatured && (
                                                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 p-5 flex flex-col justify-center">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        {product.category && (
                                                            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                                                {product.category.name}
                                                            </span>
                                                        )}
                                                        <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1 group-hover:text-red-600 transition-colors">
                                                            {product.name}
                                                        </h3>
                                                        {product.description && (
                                                            <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="text-right flex-shrink-0 ml-4">
                                                        {product.price ? (
                                                            <span className="text-xl font-bold text-gray-900">
                                                                AED {product.price.toLocaleString()}
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm text-gray-400 italic">Contact for price</span>
                                                        )}
                                                    </div>
                                                </div>
                                                {product.subCategory && (
                                                    <span className="text-xs text-gray-400 mt-2">
                                                        {product.subCategory.name}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>

                {/* Categories Browse Section */}
                {categories.length > 0 && (
                    <section className="py-16 bg-white border-t border-gray-100">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-12">
                                <span className="inline-block text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">Browse by Category</span>
                                <h2 className="text-3xl font-bold text-gray-900">Product Categories</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {categories.map((cat) => {
                                    const navSlug = cat.navbarCategory?.slug || '';
                                    return (
                                        <Link
                                            key={cat._id}
                                            href={`/${navSlug}/${cat.slug}`}
                                            className="group bg-gray-50 hover:bg-gradient-to-br hover:from-red-50 hover:to-white rounded-2xl p-6 text-center border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
                                        >
                                            {cat.image ? (
                                                <div className="w-16 h-16 mx-auto mb-3 relative">
                                                    <Image src={cat.image} alt={cat.name} fill className="object-contain" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 mx-auto mb-3 bg-red-100 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                                    <svg className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                            )}
                                            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors">
                                                {cat.name}
                                            </h3>
                                            {cat.navbarCategory && (
                                                <p className="text-xs text-gray-400 mt-1">{cat.navbarCategory.name}</p>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </div>
    );
}
