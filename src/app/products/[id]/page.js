"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ProductPage({ params }) {
    const searchParams = useSearchParams();
    const id = params?.id;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function loadProduct() {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
            setLoading(false);
        }
        loadProduct();
    }, [id]);

    useEffect(() => {
        async function handleSearch() {
            const query = searchParams.get("search");
            if (query) {
                const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
                const results = await res.json();
                setSearchResults(results);
            }
        }
        handleSearch();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="animate-pulse">
                    <div className="h-96 bg-gray-200 rounded-lg"></div>
                    <div className="mt-8 space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
            </div>
        );
    }

    return (
  <div className="container px-5 py-20 mx-auto pt-50">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="relative w-full h-96">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
        />
      </div>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-15">{product.name}</h1>
        <div className="flex mb-10">
        </div>
        <p className="leading-relaxed">{product.description}</p>
        <div className="flex">
          <div className="title-font font-medium text-2xl text-gray-900 mt-10">{product.price} TL</div>
        </div>
      </div>
    </div>
  </div>
    );
}