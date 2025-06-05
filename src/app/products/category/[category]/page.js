"use client";

import { useState, useEffect } from "react";
import ProductCards from "@/components/ProductCards";
import ProductFilters from "@/components/ProductFilters";
import { useParams } from "next/navigation";

export default function CategoryProductsPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({ minPrice: null, maxPrice: null });
    const [sortBy, setSortBy] = useState('name-asc');
    const [categoryName, setCategoryName] = useState('');
    const params = useParams();
    const categorySlug = params.category;

    

    useEffect(() => {
        async function loadCategoryAndProducts() {
            // Fetch category name
            const categoryRes = await fetch(`/api/categories/${categorySlug}`);
            const categoryData = await categoryRes.json();
            setCategoryName(categoryData.name);

            // Fetch products
            const productsRes = await fetch(`/api/products/category/${categorySlug}`);
            const productsData = await productsRes.json();
            setProducts(productsData);
            setFilteredProducts(productsData);
        }
        loadCategoryAndProducts();
    }, [categorySlug]);

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
                        {categoryName}
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