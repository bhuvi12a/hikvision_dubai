'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

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

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    navbarCategory?: { _id: string; name: string; slug: string };
}

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    category: string | { _id: string };
}

export default function NavbarCategoryPage({ params }: { params: Promise<{ navbarCategory: string }> }) {
    const { navbarCategory } = use(params);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const navSlug = navbarCategory;
    const title = navSlug.replace(/-/g, ' ');

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

                // Filter categories that belong to this navbar category
                const filteredCats = Array.isArray(catData)
                    ? catData.filter((cat: Category) => cat.navbarCategory?.slug === navSlug)
                    : [];
                setCategories(filteredCats);

                // Filter subcategories belonging to those categories
                const catIds = filteredCats.map((c: Category) => c._id);
                if (Array.isArray(subData)) {
                    setSubCategories(subData.filter((sub: SubCategory) => {
                        const subCatId = typeof sub.category === 'object' ? (sub.category as any)._id : sub.category;
                        return catIds.includes(subCatId);
                    }));
                }

                // Filter products belonging to those categories
                if (Array.isArray(prodData)) {
                    setProducts(prodData.filter((prod: Product) => {
                        return prod.category && catIds.includes(prod.category._id);
                    }));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navSlug]);

    const getSubCategoriesForCategory = (categoryId: string) => {
        return subCategories.filter((sub) => {
            const catId = typeof sub.category === 'object' ? (sub.category as any)._id : sub.category;
            return catId === categoryId;
        });
    };

    const getProductsForCategory = (categoryId: string) => {
        return products.filter((prod) => prod.category?._id === categoryId);
    };

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
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                            <span>/</span>
                            <span className="text-red-400 capitalize">{title}</span>
                        </nav>
                        <h1 className="text-3xl md:text-4xl font-bold text-white capitalize">{title}</h1>
                        <p className="text-gray-400 mt-2 max-w-xl">Browse all categories and products in {title}.</p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-10">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                                    <div className="h-40 bg-gray-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <svg className="w-20 h-20 mx-auto text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Found</h3>
                            <p className="text-gray-500 mb-6">No categories are available in this section yet.</p>
                            <Link href="/products" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                                ← Back to Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {categories.map((cat) => {
                                const subs = getSubCategoriesForCategory(cat._id);
                                const catProducts = getProductsForCategory(cat._id);

                                return (
                                    <div key={cat._id}>
                                        {/* Category Header */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">{cat.name}</h2>
                                                {cat.description && <p className="text-gray-500 text-sm mt-1">{cat.description}</p>}
                                            </div>
                                            <Link
                                                href={`/${navSlug}/${cat.slug}`}
                                                className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1 transition-colors"
                                            >
                                                View All
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>

                                        {/* Subcategories */}
                                        {subs.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-6">
                                                {subs.map((sub) => (
                                                    <Link
                                                        key={sub._id}
                                                        href={`/${navSlug}/${cat.slug}/${sub.slug}`}
                                                        className="group bg-white border border-gray-100 hover:border-red-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300"
                                                    >
                                                        {sub.image ? (
                                                            <div className="w-10 h-10 mx-auto mb-2 relative">
                                                                <Image src={sub.image} alt={sub.name} fill className="object-contain" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-10 h-10 mx-auto mb-2 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        <span className="text-xs font-medium text-gray-700 group-hover:text-red-600 transition-colors">{sub.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Products Grid */}
                                        {catProducts.length > 0 && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                                {catProducts.slice(0, 8).map((product) => (
                                                    <Link
                                                        key={product._id}
                                                        href={`/${navSlug}/${cat.slug}/${product.subCategory?.slug || ''}/${product.slug}`}
                                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                                    >
                                                        <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                                                            {product.images?.length > 0 ? (
                                                                <Image src={product.images[0]} alt={product.name} fill className="object-contain p-3 group-hover:scale-110 transition-transform duration-500" />
                                                            ) : (
                                                                <div className="flex items-center justify-center h-full">
                                                                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                            {product.isFeatured && (
                                                                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Featured</span>
                                                            )}
                                                        </div>
                                                        <div className="p-4">
                                                            <h4 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors line-clamp-2">{product.name}</h4>
                                                            {product.price ? (
                                                                <span className="text-base font-bold text-gray-900 mt-1 block">AED {product.price.toLocaleString()}</span>
                                                            ) : (
                                                                <span className="text-xs text-gray-400 mt-1 block italic">Contact for price</span>
                                                            )}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {catProducts.length === 0 && subs.length === 0 && (
                                            <p className="text-gray-400 text-sm italic">No products or subcategories available yet.</p>
                                        )}

                                        {/* Divider */}
                                        <div className="border-b border-gray-200 mt-8" />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
