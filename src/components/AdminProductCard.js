'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AdminProductCard({ product, onDelete }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col items-center p-6 transition-all duration-300 hover:border-[#b42b2b] hover:shadow-xl hover:scale-[1.03]">
            <div className="relative w-56 h-56 mb-5 flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-50 transition-all duration-300">
                    <Image
                        src={product.image || 'https://res.cloudinary.com/dzsffa5sb/image/upload/v1748121811/hafpe4djl6omb5wnja2s.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="224px"
                    />
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onDelete(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white/80 text-red-600 p-1 rounded-full shadow hover:bg-red-600 hover:text-white transition-colors"
                    title="Sil"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col items-center w-full">
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2 line-clamp-2">{product.name}</h3>
                <span className="text-xl font-bold text-[#b42b2b]">{product.price.toLocaleString('tr-TR')} TL</span>
            </div>
        </div>
    );
}
