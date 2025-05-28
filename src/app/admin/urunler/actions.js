'use server';
import { getProducts, seedProducts } from "@/lib/prisma";


/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name 
 * @property {?string} description
 * @property {number} price
 * @property {string} image
 * @property {?string} categories
 */

export async function getAllProducts() {
    const products = await getProducts();
    return products;
}   

export async function seedProductsAction() {
    await seedProducts();
}








