import { PrismaClient } from '@/generated/prisma/client'
import { clerkClient } from '@clerk/nextjs/server'

const globalForPrisma = global

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const seedProducts = async () => {
    const count = await prisma.product.count()
    if (count === 0) {
        const existingCategory = await prisma.category.findFirst()
        await prisma.product.create({
            data: {
                name: 'Kırmızı Gül Buketi',
                description: 'Özel günler için 12 adet kırmızı gül buketi',
                price: 300.00,
                image: '/cicekler/1748448761902-698160663-41-adet-yapay-gul.jpg',
                categories: {
                    connect: { id: existingCategory.id }
                }
            }
        });
    }
}


export async function createProduct(data) {
    return await prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            categories: {
                connect: data.categories
            }
        }
    })
}

export async function getProducts() {
    return await prisma.product.findMany({
        include: {
            categories: true
        }
    })
}

export async function getProduct(id) {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            categories: true
        }
    })
}

export async function updateProduct(id, data) {
    return await prisma.product.update({
        where: { id: String(id) },
        data: {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            image: data.image,
            categories: data.categories
        },
        include: {
            categories: true
        }
    });
}

export async function deleteProduct(id) {
    return await prisma.product.delete({
        where: { id }
    })
}

export async function createCategory(data) {
    return await prisma.category.create({
        data
    })
}

export async function getAllCategories() {
    return await prisma.category.findMany({
        include: {
            products: true,
            group: true
        }
    })
}

export async function getCategory(id) {
    return await prisma.category.findUnique({
        where: { id },
        include: {
            products: true,
            group: true
        }
    })
}

export async function getCategoryBySlug(slug) {
    return await prisma.category.findUnique({
        where: { slug },
        include: {
            products: true,
            group: true
        }
    })
}

export async function updateCategory(id, data) {
    return await prisma.category.update({
        where: { id },
        data
    })
}

export async function deleteCategory(id) {
    return await prisma.category.delete({
        where: { id }
    })
}

export async function createCategoryGroup(data) {
    return await prisma.categoryGroup.create({
        data
    });
}

export async function getAllCategoryGroups() {
    return await prisma.categoryGroup.findMany({
        include: {
            categories: true
        }
    });
}

export async function getCategoryGroup(id) {
    return await prisma.categoryGroup.findUnique({
        where: { id },
        include: {
            categories: true
        }
    });
}

export async function updateCategoryGroup(id, data) {
    return await prisma.categoryGroup.update({
        where: { id },
        data
    });
}

export async function deleteCategoryGroup(id) {
    return await prisma.categoryGroup.delete({
        where: { id }
    });
}

export async function getAllUsers() {
    return await prisma.user.findMany();
}

export async function getUserById(id) {
    return await prisma.user.findUnique({
        where: { id }
    });
}

export async function createOrUpdateUser(email, name) {
    return await prisma.user.upsert({
        where: { email },
        update: { name },
        create: {
            email,
            name,
            role: 'user'
        }
    });
}

export async function updateUserRole(userId, role) {
    return await prisma.user.update({
        where: { id: userId },
        data: { role }
    });
}

export async function makeUserAdmin(email) {
    return await prisma.user.update({
        where: { email },
        data: { role: 'admin' }
    });
}

 

