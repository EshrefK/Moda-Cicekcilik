'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

export default function ProductFilters({ products, onFilterChange, onSortChange }) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const sortOptions = [
        { label: 'Alfabetik olarak, A-Z', value: 'name-asc' },
        { label: 'Alfabetik olarak, Z-A', value: 'name-desc' },
        { label: 'Fiyat: Düşükten Yükseğe', value: 'price-asc' },
        { label: 'Fiyat: Yüksekten Düşüğe', value: 'price-desc' },
        { label: 'En Yeni', value: 'date-desc' },
        { label: 'En Eski', value: 'date-asc' },
    ];

    const handlePriceFilter = () => {
        onFilterChange({
            minPrice: priceRange.min ? parseFloat(priceRange.min) : null,
            maxPrice: priceRange.max ? parseFloat(priceRange.max) : null,
        });
        setIsFilterOpen(false);
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 relative">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 font-medium"
                    >
                        <AdjustmentsHorizontalIcon className="w-5 h-5" />
                        Filtrele
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isFilterOpen && (
                        <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                            <h3 className="font-semibold mb-3">Fiyat Aralığı</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Min Fiyat</label>
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="Min"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Max Fiyat</label>
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="Max"
                                    />
                                </div>
                                <button
                                    onClick={handlePriceFilter}
                                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Uygula
                                </button>
                                <button
                                    onClick={() => {
                                        setPriceRange({ min: '', max: '' });
                                        onFilterChange({ minPrice: null, maxPrice: null });
                                        setIsFilterOpen(false);
                                    }}
                                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Sıfırla
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-700 relative">
                        <span className="font-medium">Sıralama ölçütü:</span>
                        <button 
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 font-medium"
                        >
                            {sortOptions.find(opt => opt.value === undefined) ? sortOptions[0].label : sortOptions.find(opt => opt.value === undefined)?.label}
                            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSortOpen && (
                            <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            onSortChange(option.value);
                                            setIsSortOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <span className="text-gray-600 whitespace-nowrap">{products.length} ürün</span>
                </div>
            </div>
        </div>
    );
} 