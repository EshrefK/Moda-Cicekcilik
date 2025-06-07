import Link from "next/link";
import { UserGroupIcon, CubeIcon, PlusCircleIcon, TagIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { TbBasketPlus } from "react-icons/tb";


export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#FFF5E6] pt-20">
            <div className="w-56 border-r border-gray-200 p-4 pt-20">
                <h2 className="text-lg font-semibold text-[#8B0000] mb-6">Admin Menü</h2>
                <nav className="space-y-1">
                    <Link 
                        href="/admin/kullanicilar" 
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#8B0000] hover:bg-gray-50 rounded-md transition-all border-l-2 border-transparent hover:border-[#8B0000]"
                    >
                        <UserGroupIcon className="w-5 h-5" />
                        Kullanıcıları Yönet
                    </Link>
                    <Link 
                        href="/admin/urunler" 
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#8B0000] hover:bg-gray-50 rounded-md transition-all border-l-2 border-transparent hover:border-[#8B0000]"
                    >
                        <CubeIcon className="w-5 h-5" />
                        Ürünleri Yönet
                    </Link>
                    <Link 
                        href="/admin/urun-ekle"
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#8B0000] hover:bg-gray-50 rounded-md transition-all border-l-2 border-transparent hover:border-[#8B0000]"
                    >
                        <TbBasketPlus className="w-5 h-5" /> 
                        Ürün Ekle
                    </Link>
                    <Link 
                        href="/admin/kategoriler"
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#8B0000] hover:bg-gray-50 rounded-md transition-all border-l-2 border-transparent hover:border-[#8B0000]"
                    >
                        <TagIcon className="w-5 h-5" />
                        Kategorileri Yönet
                    </Link>
                </nav>
            </div>

            <div className="flex-1 p-8 pt-20">
                {children}
            </div>
        </div>
    );
} 