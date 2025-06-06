'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button 
            type="submit" 
            disabled={pending}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
            {pending ? 'Güncelleniyor...' : 'Güncelle'}
        </button>
    );
}

export default function AdminProductDetailPage({ params }) {
    const { id } = use(params);
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', price: '', image: '', description: '', categoryIds: [] });
    const [allCategories, setAllCategories] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/products/${id}`);
            if (res.ok) {
                const data = await res.json();
                setProduct(data);
                setForm({
                    name: data.name,
                    price: data.price,
                    image: data.image || '',
                    description: data.description || '',
                    categoryIds: data.categories ? data.categories.map(cat => cat.id) : []
                });
            }
            setLoading(false);
        }
        async function fetchCategories() {
            const res = await fetch('/api/categories');
            if (res.ok) {
                setAllCategories(await res.json());
            }
        }
        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleDelete = async () => {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        router.push('/admin/urunler');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Lütfen bir resim dosyası seçin');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        if (form.image) {
            formData.append('previousImagePath', form.image);
        }

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            const data = await res.json();
            setForm(f => ({ ...f, image: data.path }));
            setProduct(p => ({ ...p, image: data.path }));
        } else {
            alert('Resim yüklenirken bir hata oluştu');
        }

        setUploading(false);
    };

    async function handleUpdate(formData) {
        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                price: parseFloat(formData.get('price')),
                image: form.image,
                description: formData.get('description'),
                categoryIds: form.categoryIds
            })
        });
            
        if (res.ok) {
            router.refresh();
        } else {
            alert('Ürün güncellenirken bir hata oluştu');
        }
    }

    const handleCategoryAdd = (e) => {
        const catId = e.target.value;
        if (catId && !form.categoryIds.includes(catId)) {
            setForm(f => ({ ...f, categoryIds: [...f.categoryIds, catId] }));
        }
        e.target.value = '';
    };

    const handleCategoryRemove = (catId) => {
        setForm(f => ({ ...f, categoryIds: f.categoryIds.filter(id => id !== catId) }));
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (!product) return <div>Ürün bulunamadı.</div>;

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 flex flex-col gap-8">
            <form action={handleUpdate} className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex flex-col items-center gap-2">
                        {form.image ? (
                            <div className="relative w-56 h-56">
                                <Image 
                                    src={form.image}
                                    alt={form.name} 
                                    fill
                                    className="object-cover border-2 border-gray-200" 
                                />
                            </div>
                        ) : (
                            <div className="w-56 h-56 border-2 border-gray-200 flex items-center justify-center bg-gray-50">
                                <span className="text-gray-400">Resim yok</span>
                            </div>
                        )}
                        
                        <div className="mt-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                                disabled={uploading}
                            />
                            <label
                                htmlFor="image-upload"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer inline-block"
                            >
                                {uploading ? 'Yükleniyor...' : 'Resim Yükle'}
                            </label>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            className="w-full border px-3 py-2 rounded text-lg font-semibold"
                            placeholder="Ürün adı"
                            required
                        />
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            className="w-full border px-3 py-2 rounded text-lg"
                            placeholder="Ürün açıklaması"
                            rows="4"
                        />
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                            className="w-full border px-3 py-2 rounded text-lg"
                            placeholder="Fiyat"
                            required
                        />
                        <input
                            type="hidden"
                            name="image"
                            value={form.image}
                        />
                        <div>
                            <label className="block mb-1 font-medium">Kategori Ekle</label>
                            <select
                                onChange={handleCategoryAdd}
                                className="w-full border px-3 py-2 rounded"
                                defaultValue=""
                            >
                                <option value="" disabled>Kategori seç...</option>
                                {allCategories.filter(cat => !form.categoryIds.includes(cat.id)).map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 font-semibold">Seçili Kategoriler:</div>
                    <div className="flex flex-wrap gap-2">
                        {form.categoryIds.length === 0 && <span className="text-gray-400">Kategori yok</span>}
                        {form.categoryIds.map(catId => {
                            const cat = allCategories.find(c => c.id === catId);
                            return cat ? (
                                <span key={cat.id} className="inline-flex items-center bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm">
                                    {cat.name}
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryRemove(cat.id)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        aria-label="Kategoriyi kaldır"
                                    >
                                        ×
                                    </button>
                                </span>
                            ) : null;
                        })}
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button 
                        type="button"
                        onClick={handleDelete} 
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    >
                        Sil
                    </button>
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
} 