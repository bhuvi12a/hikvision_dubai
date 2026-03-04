'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

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
    isActive: boolean;
    createdAt: string;
}

interface ProductListProps {
    onEdit?: (product: Product) => void;
    refreshTrigger?: number;
}

const ProductList = ({ onEdit, refreshTrigger }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            if (data.products && Array.isArray(data.products)) setProducts(data.products);
            else if (Array.isArray(data)) setProducts(data);
        } catch {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [refreshTrigger]);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Product deleted');
                setProducts(prev => prev.filter(p => p._id !== id));
            } else {
                toast.error('Failed to delete');
            }
        } catch {
            toast.error('Error deleting product');
        }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-gray-100 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">📋 Products ({products.length})</h2>
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-gray-500 text-center py-12">
                    <span className="text-4xl block mb-3">📦</span>
                    {products.length === 0
                        ? 'No products yet. Add your first product above.'
                        : 'No products match your search.'}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-left">
                                <th className="pb-3 pl-2 font-semibold text-gray-600">Image</th>
                                <th className="pb-3 font-semibold text-gray-600">Product</th>
                                <th className="pb-3 font-semibold text-gray-600">Category</th>
                                <th className="pb-3 font-semibold text-gray-600">Price</th>
                                <th className="pb-3 font-semibold text-gray-600">Status</th>
                                <th className="pb-3 font-semibold text-gray-600 text-right pr-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((product) => (
                                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 pl-2">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative">
                                            {product.images?.[0] ? (
                                                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-300 text-lg">📷</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="font-medium text-gray-900">{product.name}</div>
                                        <div className="text-xs text-gray-400">/{product.slug}</div>
                                    </td>
                                    <td className="py-3">
                                        <div className="text-gray-700">{product.category?.name || '—'}</div>
                                        {product.subCategory && (
                                            <div className="text-xs text-gray-400">{product.subCategory.name}</div>
                                        )}
                                    </td>
                                    <td className="py-3">
                                        {product.price ? (
                                            <span className="font-medium">AED {product.price.toLocaleString()}</span>
                                        ) : (
                                            <span className="text-gray-400 italic text-xs">No price</span>
                                        )}
                                    </td>
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            {product.isFeatured && (
                                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">⭐ Featured</span>
                                            )}
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {product.isActive !== false ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-right pr-2">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onEdit?.(product)}
                                                className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-medium transition-colors"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id, product.name)}
                                                className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium transition-colors"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductList;
