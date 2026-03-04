'use client';

import React from 'react';
import DashboardStats from '../Components/admin/DashboardStats';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <DashboardStats />
        </div>
    );
}
