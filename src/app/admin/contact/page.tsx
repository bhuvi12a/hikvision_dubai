'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function ContactManagement() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Contact | null>(null);

    useEffect(() => {
        fetch('/api/admin/contacts').then(r => r.json()).then(d => { if (Array.isArray(d)) setContacts(d); })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this message?')) return;
        const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
        if (res.ok) { toast.success('Deleted'); setContacts(prev => prev.filter(c => c._id !== id)); if (selected?._id === id) setSelected(null); }
    };

    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">📧 Contact Messages</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Messages List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-bold mb-4">Messages ({contacts.length})</h2>
                    {loading ? <div className="text-center py-8 text-gray-400">Loading...</div> :
                        contacts.length === 0 ? <div className="text-center py-12 text-gray-400"><span className="text-4xl block mb-3">📭</span>No messages yet.</div> : (
                            <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                {contacts.map(contact => (
                                    <div key={contact._id}
                                        onClick={() => setSelected(contact)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${selected?._id === contact._id ? 'border-red-300 bg-red-50' : 'hover:bg-gray-50'}`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="font-medium text-gray-900">{contact.name}</span>
                                                <span className="text-xs text-gray-400 ml-2">{contact.email}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">{formatDate(contact.createdAt)}</span>
                                        </div>
                                        {contact.subject && <div className="text-sm font-medium text-gray-700 mt-1">{contact.subject}</div>}
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{contact.message}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

                {/* Message Detail */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-bold mb-4">Message Detail</h2>
                    {selected ? (
                        <div>
                            <div className="space-y-3 mb-6">
                                <div><span className="text-xs text-gray-400">From:</span><p className="font-medium">{selected.name}</p></div>
                                <div><span className="text-xs text-gray-400">Email:</span><p className="text-sm text-blue-600">{selected.email}</p></div>
                                {selected.phone && <div><span className="text-xs text-gray-400">Phone:</span><p className="text-sm">{selected.phone}</p></div>}
                                {selected.subject && <div><span className="text-xs text-gray-400">Subject:</span><p className="font-medium">{selected.subject}</p></div>}
                                <div><span className="text-xs text-gray-400">Date:</span><p className="text-sm">{formatDate(selected.createdAt)}</p></div>
                            </div>
                            <div className="border-t pt-4">
                                <span className="text-xs text-gray-400">Message:</span>
                                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{selected.message}</p>
                            </div>
                            <button onClick={() => handleDelete(selected._id)}
                                className="mt-6 w-full text-red-600 border border-red-200 py-2 rounded-lg hover:bg-red-50 text-sm font-medium">
                                🗑️ Delete Message
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-400 text-center py-12"><span className="text-3xl block mb-2">👈</span>Select a message to view</div>
                    )}
                </div>
            </div>
        </div>
    );
}
