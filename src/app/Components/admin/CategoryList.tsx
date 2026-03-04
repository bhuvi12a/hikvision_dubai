'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    navbarCategory?: { _id: string; name: string };
}

interface CategoryListProps {
    onEdit?: (cat: Category) => void;
    refreshTrigger?: number;
}

const CategoryList = ({ onEdit, refreshTrigger }: CategoryListProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/categories').then(r => r.json()).then(d => { if (Array.isArray(d)) setCategories(d); })
            .catch(() => toast.error('Failed to fetch')).finally(() => setLoading(false));
    }, [refreshTrigger]);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete "${name}"?`)) return;
        const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
        if (res.ok) { toast.success('Deleted'); setCategories(prev => prev.filter(c => c._id !== id)); }
        else toast.error('Failed to delete');
    };

    if (loading) return <div className="bg-white rounded-xl shadow-sm border p-6 animate-pulse"><div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div><div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 rounded"></div>)}</div></div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📁 Categories ({categories.length})</h2>
            {categories.length === 0 ? (
                <div className="text-gray-500 text-center py-8"><span className="text-3xl block mb-2">📁</span>No categories yet.</div>
            ) : (
                <div className="space-y-2">
                    {categories.map(cat => (
                        <div key={cat._id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div>
                                <span className="font-medium text-gray-900">{cat.name}</span>
                                <span className="text-xs text-gray-400 ml-2">/{cat.slug}</span>
                                {cat.navbarCategory && <span className="ml-2 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{cat.navbarCategory.name}</span>}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onEdit?.(cat)} className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-xs font-medium">✏️ Edit</button>
                                <button onClick={() => handleDelete(cat._id, cat.name)} className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-xs font-medium">🗑️ Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;
