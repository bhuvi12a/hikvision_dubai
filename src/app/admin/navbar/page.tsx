'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface NavbarCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    order: number;
}

export default function NavbarManagement() {
    const [items, setItems] = useState<NavbarCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState('0');
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchItems = () => {
        fetch('/api/admin/navbar-categories').then(r => r.json()).then(d => { if (Array.isArray(d)) setItems(d); })
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchItems(); }, []);

    const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setSaving(true);
        const payload = { name, slug: slug || generateSlug(name), description, order: parseInt(order) || 0 };
        const url = editId ? `/api/admin/navbar-categories/${editId}` : '/api/admin/navbar-categories';
        const res = await fetch(url, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) { toast.success(editId ? 'Updated!' : 'Created!'); resetForm(); fetchItems(); }
        else toast.error('Failed');
        setSaving(false);
    };

    const handleEdit = (item: NavbarCategory) => {
        setEditId(item._id); setName(item.name); setSlug(item.slug);
        setDescription(item.description || ''); setOrder(String(item.order)); setShowForm(true);
    };

    const handleDelete = async (id: string, n: string) => {
        if (!confirm(`Delete "${n}"?`)) return;
        const res = await fetch(`/api/admin/navbar-categories/${id}`, { method: 'DELETE' });
        if (res.ok) { toast.success('Deleted'); setItems(prev => prev.filter(i => i._id !== id)); }
    };

    const resetForm = () => { setEditId(null); setName(''); setSlug(''); setDescription(''); setOrder('0'); setShowForm(false); };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Navbar Category Management</h1>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 font-medium">➕ Add</button>
                )}
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold">{editId ? '✏️ Edit' : '➕ Add'} Navbar Category</h2>
                        <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 text-sm">✕ Cancel</button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value); if (!editId) setSlug(generateSlug(e.target.value)); }}
                                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                <input type="number" value={order} onChange={(e) => setOrder(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                            </div>
                        </div>
                        <button type="submit" disabled={saving} className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 font-medium disabled:opacity-50">
                            {saving ? 'Saving...' : editId ? 'Update' : 'Save'}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4">🔗 Navbar Categories ({items.length})</h2>
                {loading ? <div className="text-center py-8 text-gray-400">Loading...</div> :
                    items.length === 0 ? <div className="text-center py-8 text-gray-400">No navbar categories.</div> : (
                        <div className="space-y-2">
                            {items.map(item => (
                                <div key={item._id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                                    <div>
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-xs text-gray-400 ml-2">/{item.slug}</span>
                                        <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Order: {item.order}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(item)} className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-xs font-medium">✏️ Edit</button>
                                        <button onClick={() => handleDelete(item._id, item.name)} className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-xs font-medium">🗑️ Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
}
