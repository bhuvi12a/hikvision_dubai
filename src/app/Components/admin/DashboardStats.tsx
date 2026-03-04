'use client';

import React, { useEffect, useState } from 'react';

interface Stats {
    products: number;
    categories: number;
    subCategories: number;
    contacts: number;
}

const DashboardStats = () => {
    const [stats, setStats] = useState<Stats>({ products: 0, categories: 0, subCategories: 0, contacts: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/dashboard-stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const cards = [
        { label: 'Total Products', value: stats.products, icon: '📦', color: 'bg-blue-50 text-blue-600 border-blue-200' },
        { label: 'Categories', value: stats.categories, icon: '📁', color: 'bg-green-50 text-green-600 border-green-200' },
        { label: 'Sub Categories', value: stats.subCategories, icon: '📂', color: 'bg-purple-50 text-purple-600 border-purple-200' },
        { label: 'Contact Messages', value: stats.contacts, icon: '📧', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card) => (
                <div key={card.label} className={`rounded-xl shadow-sm border p-6 ${card.color}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium opacity-75">{card.label}</h3>
                            <p className="text-3xl font-bold mt-2">
                                {loading ? '—' : card.value}
                            </p>
                        </div>
                        <span className="text-3xl">{card.icon}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
