'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../../Components/navbar';
import Footer from '../../../../Components/footer';

interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    specifications?: string;
    price?: number;
    images: string[];
    category?: { _id: string; name: string; slug: string };
    subCategory?: { _id: string; name: string; slug: string };
    isFeatured: boolean;
}

export default function ProductPage({ params }: { params: Promise<{ navbarCategory: string; categorySlug: string; subcategorySlug: string; productSlug: string }> }) {
    const resolvedParams = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    const navSlug = resolvedParams.navbarCategory;
    const catSlug = resolvedParams.categorySlug;
    const subSlug = resolvedParams.subcategorySlug;
    const productSlug = resolvedParams.productSlug;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();

                if (Array.isArray(data)) {
                    const found = data.find((p: Product) => p.slug === productSlug);
                    if (found) {
                        setProduct(found);
                        // Get related products from same category
                        const related = data.filter(
                            (p: Product) => p._id !== found._id && p.category?._id === found.category?._id
                        );
                        setRelatedProducts(related.slice(0, 4));
                    }
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productSlug]);

    const title = productSlug.replace(/-/g, ' ');

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="pt-16 min-h-screen bg-gray-50">
                    <div className="container mx-auto px-4 py-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="bg-white rounded-2xl h-96 animate-pulse" />
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
                                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                                <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse mt-6" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <Navbar />
                <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <svg className="w-20 h-20 mx-auto text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                        <p className="text-gray-500 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                        <Link href="/products" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                            ← Browse Products
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="pt-16 min-h-screen bg-gray-50">
                {/* Breadcrumbs */}
                <div className="bg-white border-b border-gray-100">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-red-600 transition-colors">Products</Link>
                            <span>/</span>
                            <Link href={`/${navSlug}`} className="hover:text-red-600 transition-colors capitalize">{navSlug.replace(/-/g, ' ')}</Link>
                            <span>/</span>
                            <Link href={`/${navSlug}/${catSlug}`} className="hover:text-red-600 transition-colors capitalize">{catSlug.replace(/-/g, ' ')}</Link>
                            <span>/</span>
                            <Link href={`/${navSlug}/${catSlug}/${subSlug}`} className="hover:text-red-600 transition-colors capitalize">{subSlug.replace(/-/g, ' ')}</Link>
                            <span>/</span>
                            <span className="text-gray-700 font-medium capitalize line-clamp-1">{product.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Detail */}
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Image Gallery */}
                        <div>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                                <div className="relative h-80 md:h-[450px] bg-gradient-to-br from-gray-50 to-gray-100">
                                    {product.images?.length > 0 ? (
                                        <Image
                                            src={product.images[selectedImage]}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-6"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {product.isFeatured && (
                                        <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                                            ⭐ Featured
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {product.images?.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${selectedImage === idx
                                                ? 'border-red-600 shadow-lg shadow-red-600/20'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="relative w-full h-full bg-gray-50">
                                                <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-contain p-1" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            {/* Category badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.category && (
                                    <Link
                                        href={`/${navSlug}/${catSlug}`}
                                        className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-colors"
                                    >
                                        {product.category.name}
                                    </Link>
                                )}
                                {product.subCategory && (
                                    <Link
                                        href={`/${navSlug}/${catSlug}/${subSlug}`}
                                        className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                                    >
                                        {product.subCategory.name}
                                    </Link>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                            {/* Price */}
                            <div className="mb-6">
                                {product.price ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-gray-900">AED {product.price.toLocaleString()}</span>
                                        <span className="text-sm text-gray-400">incl. VAT</span>
                                    </div>
                                ) : (
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                                        <p className="text-amber-800 text-sm font-medium">💬 Contact us for pricing</p>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                                    <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">{product.description}</div>
                                </div>
                            )}

                            {/* Specifications */}
                            {product.specifications && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
                                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 whitespace-pre-line border border-gray-100">
                                        {product.specifications}
                                    </div>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                <Link
                                    href="/Contact"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Enquire Now
                                </Link>
                                <a
                                    href="https://wa.me/971XXXXXXXX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-600/25"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-8 grid grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <div className="text-lg mb-1">🛡️</div>
                                    <div className="text-xs text-gray-500 font-medium">Genuine Product</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <div className="text-lg mb-1">🚚</div>
                                    <div className="text-xs text-gray-500 font-medium">Fast Delivery</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <div className="text-lg mb-1">🔧</div>
                                    <div className="text-xs text-gray-500 font-medium">Expert Support</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <section className="mt-16">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
                                <Link
                                    href={`/${navSlug}/${catSlug}`}
                                    className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1"
                                >
                                    View All
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((rp) => (
                                    <Link
                                        key={rp._id}
                                        href={`/${navSlug}/${catSlug}/${rp.subCategory?.slug || subSlug}/${rp.slug}`}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                                            {rp.images?.length > 0 ? (
                                                <Image src={rp.images[0]} alt={rp.name} fill className="object-contain p-3 group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors line-clamp-2">{rp.name}</h4>
                                            {rp.price ? (
                                                <span className="text-base font-bold text-gray-900 mt-1 block">AED {rp.price.toLocaleString()}</span>
                                            ) : (
                                                <span className="text-xs text-gray-400 mt-1 block italic">Contact for price</span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
