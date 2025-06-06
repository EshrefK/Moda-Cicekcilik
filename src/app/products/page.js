"use client";

import { useState, useEffect, Suspense } from "react";
import ProductCards from "@/components/ProductCards";
import ProductFilters from "@/components/ProductFilters";
import { useSearchParams } from "next/navigation";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({ minPrice: null, maxPrice: null });
    const [sortBy, setSortBy] = useState('name-asc');
    const searchParams = useSearchParams();
    const category = searchParams?.get('category');
    const search = searchParams?.get('search');

    useEffect(() => {
        async function loadProducts() {
            let url = '/api/products';
            if (category) {
                url = `/api/products/category/${category}`;
            }
            if (search) {
                url = `/api/products?search=${encodeURIComponent(search)}`;
            }
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
            setFilteredProducts(data);
        }
        loadProducts();
    }, [category, search]);

    useEffect(() => {
        let result = [...products];
        if (filters.minPrice !== null) {
            result = result.filter(product => product.price >= filters.minPrice);
        }
        if (filters.maxPrice !== null) {
            result = result.filter(product => product.price <= filters.maxPrice);
        }
        result.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'date-desc':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'date-asc':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                default:
                    return 0;
            }
        });
        setFilteredProducts(result);
    }, [products, filters, sortBy]);

    const handleFilterChange = (newFilters) => setFilters(newFilters);
    const handleSortChange = (newSortBy) => setSortBy(newSortBy);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="pt-24 pb-8">
                <div className="flex justify-center">
                    <h1 className="text-3xl font-bold mb-8">
                        {category ? `${category} Çiçekleri` : 'Bütün Çiçekler'}
                    </h1>
                </div>
                <ProductFilters 
                    products={filteredProducts}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCards key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductList />
        </Suspense>
    );
}

