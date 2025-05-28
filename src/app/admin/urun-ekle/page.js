import { createProduct } from "@/app/admin/urun-ekle/product"
import { redirect } from "next/navigation"
import { getAllCategories } from "@/lib/prisma"

export default async function UrunEklePage() {
    const categories = await getAllCategories()
    
    async function addProduct(formData) {
        "use server"
        const name = formData.get("name")
        const description = formData.get("description")
        const price = formData.get("price")
        const image = formData.get("image")
        const categories = formData.getAll("categories")

        if (!name || !price) {
            throw new Error("Ürün adı ve fiyatı zorunludur")
        }

        await createProduct({
            name,
            description,
            price: parseFloat(price),
            image: image || null,
            categories: {
                connect: categories.map(id => ({ id }))
            }
        })
        redirect("/admin/urunler")
    }

    return (
        <div className="max-w-2xl pt-20 mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 flex flex-col gap-8">
            <h1 className="text-2xl font-bold mb-4">Yeni Ürün Oluştur</h1>
            <form action={addProduct} className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-56 h-56 border-2 border-gray-200 flex items-center justify-center bg-gray-50">
                            <span className="text-gray-400">Resim yok</span>
                        </div>
                        
                        <div className="mt-2">
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer inline-block"
                            >
                                Resim Yükle
                            </label>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            className="w-full border px-3 py-2 rounded text-lg font-semibold"
                            placeholder="Ürün adı"
                            required
                        />
                        <textarea
                            name="description"
                            className="w-full border px-3 py-2 rounded text-lg"
                            placeholder="Ürün açıklaması"
                            rows="4"
                        />
                        <input
                            type="number"
                            name="price"
                            className="w-full border px-3 py-2 rounded text-lg"
                            placeholder="Fiyat"
                            required
                            min="0"
                            step="0.01"
                        />
                        <div>
                            <label className="block mb-1 font-medium">Kategoriler</label>
                            <select
                                name="categories"
                                multiple
                                className="w-full border px-3 py-2 rounded"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <p className="text-sm text-gray-500 mt-1">Birden fazla kategori seçmek için Ctrl tuşuna basılı tutun</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <a 
                        href="/admin/urunler"
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                    >
                        İptal
                    </a>
                    <button 
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    >
                        Oluştur
                    </button>
                </div>
            </form>
        </div>
    );
}
