'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCards({ product }) {
    return (
        <Link href={`/products/${product.id}`}>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col items-center p-6 transition-all duration-300 hover:border-[#b42b2b] hover:shadow-xl hover:scale-[1.03]">
            <div className="relative w-56 h-56 mb-5 flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-50 transition-all duration-300">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="224px"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center w-full">
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2 line-clamp-2">{product.name}</h3>
                <span className="text-xl font-bold text-[#b42b2b]">{product.price.toLocaleString('tr-TR')} TL</span>
            </div>
        </div>
        </Link>
    );
}