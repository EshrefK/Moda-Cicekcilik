'use server'

import { createProduct as createProductInDb } from "@/lib/prisma"

export async function createProduct(data) {
    try {
        return await createProductInDb(data)
    } catch (error) {
        console.error('Error creating product:', error)
        throw new Error('Failed to create product')
    }
} 