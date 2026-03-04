'use client';

import React, { useState } from 'react';
import SubCategoryForm from '../../Components/admin/SubCategoryForm';
import SubCategoryList from '../../Components/admin/SubCategoryList';

export default function SubCategoryPage() {
    const [editSubCategory, setEditSubCategory] = useState<any>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Sub Category Management</h1>
                {!showForm && (
                    <button onClick={() => setShowForm(true)}
                        className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium">
                        ➕ Add Sub Category
                    </button>
                )}
            </div>
            <div className="space-y-8">
                {showForm && (
                    <SubCategoryForm
                        editSubCategory={editSubCategory}
                        onSaved={() => { setRefreshTrigger(p => p + 1); setEditSubCategory(null); setShowForm(false); }}
                        onCancel={() => { setEditSubCategory(null); setShowForm(false); }}
                    />
                )}
                <SubCategoryList
                    onEdit={(sub) => { setEditSubCategory(sub); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    refreshTrigger={refreshTrigger}
                />
            </div>
        </div>
    );
}
