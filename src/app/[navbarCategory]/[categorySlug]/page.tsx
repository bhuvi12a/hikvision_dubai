'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../Components/Navbra';
import Footer from '../../Components/Footer';

interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    price?: number;
    images: string[];
    category?: { _id: string; name: string; slug: string };
    subCategory?: { _id: string; name: string; slug: string };
    isFeatured: boolean;
}

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    category: string | { _id: string };
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    navbarCategory?: { _id: string; name: string; slug: string };
}

export default function CategoryPage({ params }: { params: Promise<{ navbarCategory: string; categorySlug: string }> }) {
    const { navbarCategory, categorySlug } = use(params);
    const [category, setCategory] = useState<Category | null>(null);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSub, setSelectedSub] = useState<string>('all');

    const navSlug = navbarCategory;
    const catSlug = categorySlug;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, subRes, prodRes] = await Promise.all([
                    fetch('/api/categories'),
                    fetch('/api/subcategories'),
                    fetch('/api/products'),
                ]);
                const catData = await catRes.json();
                const subData = await subRes.json();
                const prodData = await prodRes.json();

                // Find the current category
                const currentCat = Array.isArray(catData)
                    ? catData.find((c: Category) => c.slug === catSlug)
                    : null;
                setCategory(currentCat || null);

                if (currentCat) {
                    // Filter subcategories
                    if (Array.isArray(subData)) {
                        setSubCategories(subData.filter((sub: SubCategory) => {
                            const subCatId = typeof sub.category === 'object' ? (sub.category as any)._id : sub.category;
                            return subCatId === currentCat._id;
                        }));
                    }
                    // Filter products
                    if (Array.isArray(prodData)) {
                        setProducts(prodData.filter((prod: Product) => prod.category?._id === currentCat._id));
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [catSlug]);

    const filteredProducts = selectedSub === 'all'
        ? products
        : products.filter(p => p.subCategory?._id === selectedSub);

    const title = catSlug.replace(/-/g, ' ');

    return (
        <div>
            <Navbar />
            <div className="pt-16 min-h-screen bg-gray-50">
                {/* Hero */}
                <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 py-16 overflow-hidden">
                    <div className="absolute inset-0 opacity-15">
                        <div className="absolute top-10 right-20 w-72 h-72 bg-red-500 rounded-full blur-[120px] animate-pulse" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                            <span>/</span>
                            <Link href={`/${navSlug}`} className="hover:text-white transition-colors capitalize">{navSlug.replace(/-/g, ' ')}</Link>
                            <span>/</span>
                            <span className="text-red-400 capitalize">{title}</span>
                        </nav>
                        <h1 className="text-3xl md:text-4xl font-bold text-white capitalize">{category?.name || title}</h1>
                        {category?.description && (
                            <p className="text-gray-400 mt-2 max-w-xl">{category.description}</p>
                        )}
                    </div>
                </section>

                <div className="container mx-auto px-4 py-10">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                                    <div className="h-48 bg-gray-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Subcategory Filter Tabs */}
                            {subCategories.length > 0 && (
                                <div className="mb-8">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedSub('all')}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSub === 'all'
                                                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                        >
                                            All ({products.length})
                                        </button>
                                        {subCategories.map((sub) => {
                                            const count = products.filter(p => p.subCategory?._id === sub._id).length;
                                            return (
                                                <button
                                                    key={sub._id}
                                                    onClick={() => setSelectedSub(sub._id)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSub === sub._id
                                                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                        }`}
                                                >
                                                    {sub.name} ({count})
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Products Grid */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredProducts.map((product) => (
                                        <Link
                                            key={product._id}
                                            href={`/${navSlug}/${catSlug}/${product.subCategory?.slug || ''}/${product.slug}`}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                                                {product.images?.length > 0 ? (
                                                    <Image src={product.images[0]} alt={product.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <svg className="w-14 h-14 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                {product.isFeatured && (
                                                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                {product.subCategory && (
                                                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">{product.subCategory.name}</span>
                                                )}
                                                <h3 className="text-base font-bold text-gray-900 mt-2 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">{product.name}</h3>
                                                {product.description && (
                                                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
                                                )}
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                    {product.price ? (
                                                        <span className="text-lg font-bold text-gray-900">AED {product.price.toLocaleString()}</span>
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
                                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <svg className="w-20 h-20 mx-auto text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                                    <p className="text-gray-500 mb-6">No products available in this category yet.</p>
                                    <Link href="/products" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                                        ← Browse All Products
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
