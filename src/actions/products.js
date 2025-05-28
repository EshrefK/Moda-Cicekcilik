"use server"

import { createProduct } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function addProduct(prevState, formData) {
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const categories = formData.getAll("categories");
    const imageUrl = formData.get("imageUrl");

    const errors = {};

    if (!name) {
        errors.name = "Ürün adı zorunludur";
    }

    if (!price) {
        errors.price = "Fiyat zorunludur";
    }

    if (!imageUrl) {
        errors.image = "Görsel zorunludur";
    }

    if (Object.keys(errors).length > 0) {
        return {
            ...prevState,
            errors,
            success: false
        };
    }

    try {
        const product = await createProduct({
            name,
            description: description || null,
            price: parseFloat(price),
            image: imageUrl,
            categories: {
                create: categories.map(categoryId => ({
                    category: {
                        connect: {
                            id: categoryId
                        }
                    }
                }))
            }
        });

        redirect(`/admin/urunler/${product.id}`);
    } catch (error) {
        return {
            ...prevState,
            errors: {
                form: "Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin."
            },
            success: false
        };
    }
}

