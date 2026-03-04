'use client';

import React, { useState } from 'react';
import CategoryForm from '../../Components/admin/CategoryForm';
import CategoryList from '../../Components/admin/CategoryList';

export default function CategoryPage() {
    const [editCategory, setEditCategory] = useState<any>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
                {!showForm && (
                    <button onClick={() => setShowForm(true)}
                        className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium">
                        ➕ Add Category
                    </button>
                )}
            </div>
            <div className="space-y-8">
                {showForm && (
                    <CategoryForm
                        editCategory={editCategory}
                        onSaved={() => { setRefreshTrigger(p => p + 1); setEditCategory(null); setShowForm(false); }}
                        onCancel={() => { setEditCategory(null); setShowForm(false); }}
                    />
                )}
                <CategoryList
                    onEdit={(cat) => { setEditCategory(cat); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    refreshTrigger={refreshTrigger}
                />
            </div>
        </div>
    );
}
