'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../Components/Navbra';
import Footer from '../Components/Footer';

export default function SearchClient() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`/api/search?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [query]);

    return (
        <div>
            <Navbar />
            <div className="pt-20 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Search Results</h1>
                    <p className="text-gray-600 mb-8">
                        {query ? `Showing results for "${query}"` : 'Enter a search term'}
                    </p>
                    {loading ? (
                        <p>Loading...</p>
                    ) : results.length === 0 ? (
                        <p className="text-gray-500">No results found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Results will render here */}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
