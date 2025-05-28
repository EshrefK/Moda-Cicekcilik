'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetailPage({ params }) {
    const { id } = params;
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showUpdate, setShowUpdate] = useState(false);
    const [form, setForm] = useState({ name: '', price: '', imageUrl: '' });

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/products/${id}`);
            if (res.ok) {
                const data = await res.json();
                setProduct(data);
                setForm({ name: data.name, price: data.price, imageUrl: data.imageUrl || '' });
            }
            setLoading(false);
        }
        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Silmek istediğinize emin misiniz?')) return;
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            router.push('/admin/urunler');
        } else {
            alert('Silme işlemi başarısız!');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                price: parseFloat(form.price),
                imageUrl: form.imageUrl
            })
        });
        if (res.ok) {
            const updated = await res.json();
            setProduct(updated);
            setShowUpdate(false);
        } else {
            alert('Güncelleme başarısız!');
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (!product) return <div>Ürün bulunamadı.</div>;

    return (
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow mt-10">
            <img src={product.imageUrl || 'https://res.cloudinary.com/dzsffa5sb/image/upload/v1748121811/hafpe4djl6omb5wnja2s.jpg'} alt={product.name} className="w-64 h-64 object-cover rounded-full mx-auto mb-6 border-2 border-gray-200" />
            <h1 className="text-2xl font-bold mb-2 text-center">{product.name}</h1>
            <div className="text-xl text-[#b42b2b] font-bold text-center mb-4">{product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sil</button>
                <button onClick={() => setShowUpdate(v => !v)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Güncelle</button>
            </div>
            {showUpdate && (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border px-3 py-2 rounded" placeholder="Ürün adı" required />
                    <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="w-full border px-3 py-2 rounded" placeholder="Fiyat" required />
                    <input type="text" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} className="w-full border px-3 py-2 rounded" placeholder="Görsel URL" />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Kaydet</button>
                </form>
            )}
        </div>
    );
} 