import { getProduct, deleteProduct, updateProduct } from '@/lib/prisma';

export async function GET(req, context) {
    const params = await context.params;
    const product = await getProduct(params.id);
    if (!product) return new Response('Not found', { status: 404 });
    return Response.json(product);
}

export async function DELETE(req, context) {
    const params = await context.params;
    try {
        await deleteProduct(params.id);
        return new Response(null, { status: 204 });
    } catch (e) {
        return new Response('Delete failed', { status: 500 });
    }
}

export async function PUT(req, context) {
    const params = await context.params;
    try {
        const data = await req.json();
        const updateData = {
            name: data.name,
            price: data.price,
            image: data.image,
            description: data.description,
            categories: {
                set: data.categoryIds.map(id => ({ id }))
            }
        };
        const updated = await updateProduct(params.id, updateData);
        return Response.json(updated);
    } catch (e) {
        console.error('Update error:', e);
        return new Response(null, { status: 500 });
    }
} 