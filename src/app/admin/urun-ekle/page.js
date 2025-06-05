'use client';

import { addProduct, getCategories } from "@/app/admin/urun-ekle/product"
import { useState, useEffect } from 'react'
import { Submit } from "@/components/submit"

export default function UrunEklePage() {
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        image: null
    })
    const [imagePreview, setImagePreview] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await getCategories()
                setCategories(cats)
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }
        fetchCategories()
    }, [])

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            alert('Lütfen bir resim dosyası seçin')
            return
        }

        setUploading(true)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                const data = await res.json()
                setForm(f => ({ ...f, image: data.path }))
                setImagePreview(data.path)
            } else {
                alert('Resim yüklenirken bir hata oluştu')
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Resim yüklenirken bir hata oluştu')
        }

        setUploading(false)
    }

    const handleCategoryAdd = (e) => {
        const catId = e.target.value
        if (catId && !selectedCategories.includes(catId)) {
            setSelectedCategories([...selectedCategories, catId])
        }
        e.target.value = ''
    }

    const handleCategoryRemove = (catId) => {
        setSelectedCategories(selectedCategories.filter(id => id !== catId))
    }

    const handleSubmit = async (formData) => {
        // Add selected categories to formData
        selectedCategories.forEach(catId => {
            formData.append('categories', catId)
        })
        // Add the image path if it exists
        if (form.image) {
            formData.append('image', form.image)
        }
        await addProduct(formData)
    }

    return (
        <div className="max-w-2xl pt-20 mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 flex flex-col gap-8">
            <h1 className="text-2xl font-bold mb-4">Yeni Ürün Oluştur</h1>
            <form action={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex flex-col items-center gap-2">
                        {imagePreview ? (
                            <div className="relative w-56 h-56">
                                <img 
                                    src={imagePreview}
                                    alt="Preview" 
                                    className="w-full h-full object-cover border-2 border-gray-200" 
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
                            min="0"
                            step="0.01"
                        />
                        <div>
                            <label className="block mb-1 font-medium">Kategori Ekle</label>
                            <select
                                onChange={handleCategoryAdd}
                                className="w-full border px-3 py-2 rounded"
                                defaultValue=""
                            >
                                <option value="" disabled>Kategori seç...</option>
                                {categories.filter(cat => !selectedCategories.includes(cat.id)).map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 font-semibold">Seçili Kategoriler:</div>
                    <div className="flex flex-wrap gap-2">
                        {selectedCategories.length === 0 && <span className="text-gray-400">Kategori yok</span>}
                        {selectedCategories.map(catId => {
                            const cat = categories.find(c => c.id === catId)
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
                            ) : null
                        })}
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <a 
                        href="/admin/urunler"
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                    >
                        İptal
                    </a>
                    <Submit />
                </div>
            </form>
        </div>
    )
}
