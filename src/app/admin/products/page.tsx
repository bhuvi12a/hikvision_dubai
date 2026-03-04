'use client';

import React, { useState } from 'react';
import ProductForm from '../../Components/admin/ProductForm';
import ProductList from '../../Components/admin/ProductList';

export default function ProductsPage() {
    const [editProduct, setEditProduct] = useState<any>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [showForm, setShowForm] = useState(false);

    const handleSaved = () => {
        setRefreshTrigger(prev => prev + 1);
        setEditProduct(null);
        setShowForm(false);
    };

    const handleEdit = (product: any) => {
        setEditProduct(product);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditProduct(null);
        setShowForm(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                    >
                        ➕ Add Product
                    </button>
                )}
            </div>
            <div className="space-y-8">
                {showForm && (
                    <ProductForm
                        editProduct={editProduct}
                        onSaved={handleSaved}
                        onCancel={handleCancel}
                    />
                )}
                <ProductList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
            </div>
        </div>
    );
}
