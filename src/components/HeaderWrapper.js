'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'

export default function HeaderWrapper() {
    const [categoryGroups, setCategoryGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryGroups = async () => {
            try {
                const response = await fetch('/api/categories/groups');
                if (response.ok) {
                    const data = await response.json();
                    setCategoryGroups(data);
                }
            } catch (error) {
                console.log('Failed to fetch category groups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryGroups();
    }, []);

    return <Header categoryGroups={categoryGroups} />;
} 