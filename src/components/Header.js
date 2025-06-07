'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { ShieldCheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [categoryGroups, setCategoryGroups] = useState([]);
    const { user } = useUser();
    const isAdmin = user?.publicMetadata?.role === 'admin';

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined' && window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }
        
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

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
            }
        };

        fetchCategoryGroups();
    }, []);

    const handleDropdownClick = (groupId) => {
        setOpenDropdown(openDropdown === groupId ? null : groupId);
    };

    return (
        <header className="bg-gradient-to-r from-red-50/90 to-red-100/90 backdrop-blur-sm shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <div className="flex items-center">
                                <Image 
                                    src="/samsunmodacicekciliklogo11.png"
                                    alt="Moda Çiçekçilik"
                                    width={150}
                                    height={50}
                                    className="h-12 w-auto"
                                />
                            </div>
                        </Link>
                    </div>

                    <SearchBar />

                    <nav className="hidden md:flex items-center space-x-8">
                        <SignedOut>
                            <SignInButton>
                                <p className="text-red-700 border border-red-700 rounded-md px-4 py-2 hover:bg-red-700 hover:text-white shadow-md transition-all duration-300 cursor-pointer">Giriş Yap</p>
                            </SignInButton>
                            <SignUpButton>
                                <p className="text-red-700 border border-red-700 rounded-md px-4 py-2 hover:bg-red-700 hover:text-white shadow-md transition-all duration-300 cursor-pointer">Kayıt Ol</p>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            {isAdmin && (
                                <Link 
                                    href="/admin" 
                                    className="flex items-center gap-2 text-red-700 border border-red-700 rounded-md px-4 py-2 hover:bg-red-700 hover:text-white shadow-md transition-all duration-300"
                                >
                                    <ShieldCheckIcon className="w-5 h-5" />
                                    Admin Panel
                                </Link>
                            )}
                            <UserButton />
                        </SignedIn>
                    </nav>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-red-700 hover:text-red-800"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={`hidden md:block border-t border-red-200/50 transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden' : 'h-auto'}`}>
                    <div className="flex justify-center space-x-8 py-3">
                        <Link href="/products" className="text-red-700 hover:text-red-800 transition-colors duration-200">
                            Tüm Ürünler
                        </Link>
                        {categoryGroups.map((group) => (
                            <div key={group.id} className="relative">
                                <button
                                    onClick={() => handleDropdownClick(group.id)}
                                    className="flex items-center text-red-700 hover:text-red-800 transition-colors duration-200"
                                >
                                    {group.name}
                                    <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-300 ${openDropdown === group.id ? 'rotate-180' : ''}`} />
                                </button>
                                {openDropdown === group.id && (
                                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-red-100">
                                        <div className="p-2">
                                            <div className="text-xs font-semibold text-red-700 px-3 py-2 border-b border-red-100">
                                                {group.name} 
                                            </div>
                                            <div className="mt-2">
                                                {group.categories.map((category) => (
                                                    <Link
                                                        key={category.id}
                                                        href={`/products/category/${category.slug}`}
                                                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white/95">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <SignedIn>
                                {isAdmin && (
                                    <Link 
                                        href="/admin" 
                                        className="flex items-center gap-2 px-3 py-2 text-red-700 hover:text-red-800 transition-colors duration-200"
                                    >
                                        <ShieldCheckIcon className="w-5 h-5" />
                                        Admin Panel
                                    </Link>
                                )}
                            </SignedIn>
                            <Link 
                                href="/products" 
                                className="block px-3 py-2 text-red-700 hover:text-red-800 transition-colors duration-200"
                            >
                                Tüm Ürünler
                            </Link>
                            {categoryGroups.map((group) => (
                                <div key={group.id}>
                                    <button
                                        onClick={() => handleDropdownClick(group.id)}
                                        className="flex items-center justify-between w-full px-3 py-2 text-red-700 hover:text-red-800 transition-colors duration-200"
                                    >
                                        {group.name}
                                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${openDropdown === group.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openDropdown === group.id && (
                                        <div className="pl-4 space-y-1 bg-gray-50/50 rounded-lg mt-1">
                                            {group.categories.map((category) => (
                                                <Link
                                                    key={category.id}
                                                    href={`/products/category/${category.slug}`}
                                                    className="block px-3 py-2 text-sm text-red-700 hover:text-red-800 transition-colors duration-200 hover:bg-red-50/50 rounded-md"
                                                >
                                                    {category.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
