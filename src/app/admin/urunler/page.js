'use client';

import { useState, useEffect } from 'react';
import AdminProductCard from "@/components/AdminProductCard";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getAllProducts, seedProductsAction } from '@/app/admin/urunler/actions';
import Link from 'next/link';

export default function UrunleriListele() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const initializeProducts = async () => {
            try {
                await seedProductsAction();
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
            } catch (error) {
                console.error('Failed to initialize products:', error);
            }
        };
        
        initializeProducts();
    }, []);

    useEffect(() => {
        let result = [...products];

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(product => 
                product.name.toLowerCase().includes(searchLower) ||
                product.description?.toLowerCase().includes(searchLower) ||
                product.category?.toLowerCase().includes(searchLower)
            );
        }

        // Price filter
        result = result.filter(product => 
            product.price >= priceRange.min && 
            product.price <= (priceRange.max === Infinity ? 999999 : priceRange.max)
        );

        // Sorting
        switch (sortBy) {
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
        }

        setFilteredProducts(result);
    }, [products, searchTerm, sortBy, priceRange]);

    const handleDelete = async (productId) => {
        
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            });
                
            if (response.ok) {
                // Remove the deleted product from the state
                setProducts(products.filter(product => product.id !== productId));
                setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
            } else {
            console.error('Failed to delete product');
        }
    };

    return (
        <div className="p-6 pt-20">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <span>Filtrele</span>
                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isFilterOpen && (
                            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Fiyat Aralığı</h3>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={priceRange.min}
                                                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                            />
                                            <span className="text-gray-500">-</span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={priceRange.max === Infinity ? '' : priceRange.max}
                                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value ? Number(e.target.value) : Infinity }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ürün ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                        <option value="name-asc">İsim (A-Z)</option>
                        <option value="name-desc">İsim (Z-A)</option>
                        <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
                        <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
                    </select>
                    <div className="text-gray-600">
                        Toplam Ürün: {filteredProducts.length}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/admin/urunler/${product.id}`} className="block">
                        <AdminProductCard 
                            product={product}
                            onDelete={handleDelete}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}