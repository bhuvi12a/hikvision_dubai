'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: { _id: string } | string;
}

interface ProductFormProps {
    editProduct?: {
        _id: string;
        name: string;
        slug: string;
        modelNumber?: string;
        description?: string;
        specifications?: string;
        price?: number;
        images: string[];
        category?: { _id: string };
        subCategory?: { _id: string };
        isFeatured: boolean;
        isActive: boolean;
    } | null;
    onSaved?: () => void;
    onCancel?: () => void;
}

const ProductForm = ({ editProduct, onSaved, onCancel }: ProductFormProps) => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [description, setDescription] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetch('/api/admin/categories').then(r => r.json()).then(d => { if (Array.isArray(d)) setCategories(d); });
        fetch('/api/admin/subcategories').then(r => r.json()).then(d => { if (Array.isArray(d)) setSubCategories(d); });
    }, []);

    useEffect(() => {
        if (editProduct) {
            setName(editProduct.name || '');
            setSlug(editProduct.slug || '');
            setModelNumber(editProduct.modelNumber || '');
            setDescription(editProduct.description || '');
            setSpecifications(editProduct.specifications || '');
            setPrice(editProduct.price ? String(editProduct.price) : '');
            setImages(editProduct.images || []);
            setCategoryId(editProduct.category?._id || '');
            setSubCategoryId(editProduct.subCategory?._id || '');
            setIsFeatured(editProduct.isFeatured || false);
            setIsActive(editProduct.isActive !== undefined ? editProduct.isActive : true);
        }
    }, [editProduct]);

    const generateSlug = (text: string) => {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const handleNameChange = (value: string) => {
        setName(value);
        if (!editProduct) {
            setSlug(generateSlug(value));
        }
    };

    const filteredSubCategories = categoryId
        ? subCategories.filter(sub => {
            const catId = typeof sub.category === 'object' ? sub.category._id : sub.category;
            return catId === categoryId;
        })
        : subCategories;

    const handleAddImageUrl = () => {
        if (imageUrl.trim()) {
            setImages(prev => [...prev, imageUrl.trim()]);
            setImageUrl('');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;
        setUploading(true);

        try {
            const uploadPromises = Array.from(fileList).map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('folder', 'hikvision-dubai/products');
                const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
                const data = await res.json();
                if (data.url) {
                    return data.url;
                } else {
                    toast.error(`Failed to upload ${file.name}`);
                    return null;
                }
            });

            const urls = await Promise.all(uploadPromises);
            const validUrls = urls.filter((url): url is string => url !== null);

            if (validUrls.length > 0) {
                setImages(prev => [...prev, ...validUrls]);
                toast.success(`${validUrls.length} image(s) uploaded`);
            }
        } catch {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
            // Reset the input so the same file can be selected again
            e.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !slug.trim()) {
            toast.error('Name and slug are required');
            return;
        }
        setSaving(true);
        try {
            const payload = {
                name,
                slug,
                modelNumber: modelNumber || undefined,
                description,
                specifications,
                price: price ? parseFloat(price) : undefined,
                images,
                category: categoryId || undefined,
                subCategory: subCategoryId || undefined,
                isFeatured,
                isActive,
            };

            const url = editProduct ? `/api/admin/products/${editProduct._id}` : '/api/admin/products';
            const method = editProduct ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success(editProduct ? 'Product updated!' : 'Product created!');
                if (!editProduct) {
                    setName(''); setSlug(''); setModelNumber(''); setDescription(''); setSpecifications('');
                    setPrice(''); setImages([]); setCategoryId(''); setSubCategoryId('');
                    setIsFeatured(false); setIsActive(true);
                }
                onSaved?.();
            } else {
                const err = await res.json();
                toast.error(err.error || 'Failed to save product');
            }
        } catch {
            toast.error('Error saving product');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    {editProduct ? '✏️ Edit Product' : '➕ Add New Product'}
                </h2>
                {onCancel && (
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-sm">
                        ✕ Cancel
                    </button>
                )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name, Model Number, Slug */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="e.g. 4 MP AcuSense Fixed Dome"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Model Number</label>
                        <input
                            type="text"
                            value={modelNumber}
                            onChange={(e) => setModelNumber(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                            placeholder="e.g. DS-2CD2143G2-IU"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="auto-generated-slug"
                            required
                        />
                    </div>
                </div>

                {/* Row 2: Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={3}
                        placeholder="Product description..."
                    />
                </div>

                {/* Row 3: Specifications */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                    <textarea
                        value={specifications}
                        onChange={(e) => setSpecifications(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={3}
                        placeholder="Technical specifications..."
                    />
                </div>

                {/* Row 4: Price, Category, SubCategory */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (AED)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="0.00"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={categoryId}
                            onChange={(e) => { setCategoryId(e.target.value); setSubCategoryId(''); }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                        <select
                            value={subCategoryId}
                            onChange={(e) => setSubCategoryId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Select Sub Category</option>
                            {filteredSubCategories.map(sub => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 5: Product Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>

                    {/* Image URL Input */}
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImageUrl(); } }}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Paste image URL and press Enter or click Add..."
                        />
                        <button
                            type="button"
                            onClick={handleAddImageUrl}
                            className="px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                        >
                            + Add URL
                        </button>
                        <label className="px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium cursor-pointer text-sm flex items-center">
                            {uploading ? '⏳ Uploading...' : '📁 Upload Files'}
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
                        </label>
                    </div>

                    {/* Image Preview Grid */}
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {images.map((img, index) => (
                                <div key={index} className="relative aspect-square border-2 border-gray-200 rounded-xl overflow-hidden group hover:border-red-300 transition-colors">
                                    <img src={img} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold hover:bg-red-600"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    {index === 0 && (
                                        <span className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                                            MAIN
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400">
                            <span className="text-3xl block mb-2">🖼️</span>
                            <p className="text-sm">No images added yet. Paste a URL above or upload a file.</p>
                        </div>
                    )}
                </div>

                {/* Row 6: Toggles */}
                <div className="flex items-center gap-6 py-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">⭐ Featured Product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">✅ Active</span>
                    </label>
                </div>

                {/* Row 7: Submit */}
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-red-600 text-white px-8 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                    >
                        {saving ? '⏳ Saving...' : editProduct ? '💾 Update Product' : '💾 Save Product'}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
