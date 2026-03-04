'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../Components/navbar';
import Footer from '../../../Components/footer';

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

export default function SubcategoryPage({ params }: { params: Promise<{ navbarCategory: string; categorySlug: string; subcategorySlug: string }> }) {
    const { navbarCategory, categorySlug, subcategorySlug } = use(params);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [subCategoryName, setSubCategoryName] = useState('');

    const navSlug = navbarCategory;
    const catSlug = categorySlug;
    const subSlug = subcategorySlug;
    const title = subSlug.replace(/-/g, ' ');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [subRes, prodRes] = await Promise.all([
                    fetch('/api/subcategories'),
                    fetch('/api/products'),
                ]);
                const subData = await subRes.json();
                const prodData = await prodRes.json();

                // Find current subcategory
                const currentSub = Array.isArray(subData)
                    ? subData.find((s: any) => s.slug === subSlug)
                    : null;

                if (currentSub) {
                    setSubCategoryName(currentSub.name);
                    // Filter products for this subcategory
                    if (Array.isArray(prodData)) {
                        setProducts(prodData.filter((p: Product) => p.subCategory?._id === currentSub._id));
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [subSlug]);

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
                        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                            <span>/</span>
                            <Link href={`/${navSlug}`} className="hover:text-white transition-colors capitalize">{navSlug.replace(/-/g, ' ')}</Link>
                            <span>/</span>
                            <Link href={`/${navSlug}/${catSlug}`} className="hover:text-white transition-colors capitalize">{catSlug.replace(/-/g, ' ')}</Link>
                            <span>/</span>
                            <span className="text-red-400 capitalize">{title}</span>
                        </nav>
                        <h1 className="text-3xl md:text-4xl font-bold text-white capitalize">{subCategoryName || title}</h1>
                        <p className="text-gray-400 mt-2">Browse all products in {subCategoryName || title}.</p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-10">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                                    <div className="h-52 bg-gray-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            <p className="text-gray-500 text-sm mb-6">
                                Showing <span className="font-semibold text-gray-900">{products.length}</span> products
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <Link
                                        key={product._id}
                                        href={`/${navSlug}/${catSlug}/${subSlug}/${product.slug}`}
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
                                            <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">{product.name}</h3>
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
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <svg className="w-20 h-20 mx-auto text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                            <p className="text-gray-500 mb-6">No products are available in this subcategory yet.</p>
                            <Link href={`/${navSlug}/${catSlug}`} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                                ← Back to Category
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
