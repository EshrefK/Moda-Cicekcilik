"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function setRole(formData) {
    const { sessionClaims, userId: currentUserId } = await auth();

    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Buna erişim yetkiniz yok")
    }

    const client = await clerkClient();
    const userId = formData.get("userId");
    const role = formData.get("role")

    if (userId === currentUserId) {
        return
    }

    await client.users.updateUser(userId, {
        publicMetadata: {
            role: role
        }
    })
    revalidatePath("/admin/kullanicilar")
}

export async function removeRole(formData) {
    const { sessionClaims, userId: currentUserId } = await auth();

    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Buna erişim yetkiniz yok")
    }

    const client = await clerkClient();
    const userId = formData.get("userId");

    if (userId === currentUserId) {
        return
    }

    await client.users.updateUser(userId, {
        publicMetadata: {
            role: null
        }
    })
    revalidatePath("/admin/kullanicilar")
}


