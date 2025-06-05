import { getProducts } from "@/lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const products = await getProducts(search);
    return Response.json(products);
} 