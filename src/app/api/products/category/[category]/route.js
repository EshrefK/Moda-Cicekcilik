import { getProductsByCategory } from "@/lib/prisma";

export async function GET(request, { params }) {
    const unwrappedParams = typeof params.then === "function" ? await params : params;
    const { category } = unwrappedParams;
    
    try {
        const products = await getProductsByCategory(category);
        return Response.json(products);
    } catch (error) {
        return Response.json({ error: "Failed to fetch products" }, { status: 500 });
    }
} 