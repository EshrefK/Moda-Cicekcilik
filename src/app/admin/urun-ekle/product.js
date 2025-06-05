'use server'

import { createProduct, getAllCategories } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function addProduct(formData) {
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
            connect: categories
        }
    })
    redirect("/admin/urunler")
}

export async function getCategories() {
    return await getAllCategories()
} 