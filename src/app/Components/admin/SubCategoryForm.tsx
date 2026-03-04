'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Category { _id: string; name: string; }

interface SubCategoryFormProps {
    editSubCategory?: { _id: string; name: string; slug: string; description?: string; image?: string; category?: { _id: string }; isActive?: boolean } | null;
    onSaved?: () => void;
    onCancel?: () => void;
}

const SubCategoryForm = ({ editSubCategory, onSaved, onCancel }: SubCategoryFormProps) => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetch('/api/admin/categories').then(r => r.json()).then(d => { if (Array.isArray(d)) setCategories(d); });
    }, []);

    useEffect(() => {
        if (editSubCategory) {
            setName(editSubCategory.name || '');
            setSlug(editSubCategory.slug || '');
            setDescription(editSubCategory.description || '');
            setImage(editSubCategory.image || '');
            setCategoryId(editSubCategory.category?._id || '');
            setIsActive(editSubCategory.isActive !== undefined ? editSubCategory.isActive : true);
        }
    }, [editSubCategory]);

    const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'hikvision-dubai/subcategories');
            const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.url) {
                setImage(data.url);
                toast.success('Image uploaded');
            } else {
                toast.error('Upload failed');
            }
        } catch {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !categoryId) { toast.error('Name and category are required'); return; }
        setSaving(true);
        try {
            const payload = {
                name,
                slug: slug || generateSlug(name),
                description,
                image: image || undefined,
                category: categoryId,
                isActive,
            };
            const url = editSubCategory ? `/api/admin/subcategories/${editSubCategory._id}` : '/api/admin/subcategories';
            const res = await fetch(url, {
                method: editSubCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                toast.success(editSubCategory ? 'Updated!' : 'Created!');
                if (!editSubCategory) { setName(''); setSlug(''); setDescription(''); setImage(''); setCategoryId(''); setIsActive(true); }
                onSaved?.();
            } else {
                const err = await res.json();
                toast.error(err.error || 'Failed to save');
            }
        } catch { toast.error('Error saving'); }
        finally { setSaving(false); }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">{editSubCategory ? '✏️ Edit Sub Category' : '➕ Add Sub Category'}</h2>
                {onCancel && <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-sm">✕ Cancel</button>}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value); if (!editSubCategory) setSlug(generateSlug(e.target.value)); }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category *</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent" required>
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="auto-generated" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent" rows={2} />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <div className="flex items-center gap-3">
                        <label className="px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium cursor-pointer text-sm flex items-center gap-2">
                            {uploading ? '⏳ Uploading...' : '📁 Choose File'}
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                        </label>
                        {image && (
                            <span className="text-xs text-green-600 font-medium">✓ Image uploaded</span>
                        )}
                    </div>
                    {image && (
                        <div className="mt-3 relative inline-block">
                            <img src={image} alt="Subcategory" className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200" />
                            <button
                                type="button"
                                onClick={() => setImage('')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600 shadow-sm"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                {/* Active Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">✅ Active subcategory</span>
                </label>

                <button type="submit" disabled={saving}
                    className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50">
                    {saving ? 'Saving...' : editSubCategory ? 'Update' : 'Save Sub Category'}
                </button>
            </form>
        </div>
    );
};

export default SubCategoryForm;
