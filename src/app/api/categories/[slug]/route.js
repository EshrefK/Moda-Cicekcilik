import { getCategoryBySlug } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    const params = await context.params;
    const category = await getCategoryBySlug(params.slug);

    if (!category) {
        return NextResponse.json(
            { error: "Category not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(category);
}
