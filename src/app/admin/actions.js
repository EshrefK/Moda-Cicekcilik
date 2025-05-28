"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { Roles } from "../../../types/globals"
import { revalidatePath } from "next/cache"

export async function setRole(formData) {
    const { sessionClaims } = await auth();

    
    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Buna erişim yetkiniz yok")
    }

    const client = await clerkClient();
    const userId = formData.get("userId");
    const role = formData.get("role")

    try {
        await client.users.updateUser(userId, {
            publicMetadata: {
                role: role
            }
        })
        revalidatePath("/admin/kullanicilar")
    } catch (error) {
        return { error: "atama başarısız" }
    }
}

export async function removeRole(formData) {
    const { sessionClaims } = await auth();
    

    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Buna erişim yetkiniz yok")
    }

    const client = await clerkClient();
    const userId = formData.get("userId");
    const role = formData.get("role");

    console.log('Removing role for user:', userId);

    try {
        await client.users.updateUser(userId, {
            publicMetadata: {
                role: null
            }
        })
        revalidatePath("/admin/kullanicilar")
    } catch (error) {
        return { error: "rol kaldırma başarısız" }
    }
}


