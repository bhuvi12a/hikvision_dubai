'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: '📊' },
        { label: 'Products', href: '/admin/products', icon: '📦' },
        { label: 'Categories', href: '/admin/category', icon: '📁' },
        { label: 'Sub Categories', href: '/admin/subcategory', icon: '📂' },
        { label: 'Navbar', href: '/admin/navbar', icon: '🔗' },
        { label: 'Contacts', href: '/admin/contact', icon: '📧' },
    ];

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            toast.success('Logged out');
            router.push('/auth/login');
        } catch {
            toast.error('Logout failed');
        }
    };

    return (
        <aside className="w-64 bg-gray-900 min-h-screen text-white flex flex-col">
            <div className="p-5 border-b border-gray-700">
                <h2 className="text-xl font-bold text-red-400">🛡️ Admin Panel</h2>
                <p className="text-xs text-gray-500 mt-1">Hikvision Dubai</p>
            </div>
            <nav className="mt-2 flex-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-5 py-3.5 transition-colors text-sm ${pathname === item.href
                            ? 'bg-red-600 text-white font-medium'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
                <Link href="/" className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800 mb-2">
                    <span className="mr-3">🌐</span> View Website
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-gray-800"
                >
                    <span className="mr-3">🚪</span> Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
