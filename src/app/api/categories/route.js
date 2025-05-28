import { getAllCategories } from '@/lib/prisma';

export async function GET() {
    const categories = await getAllCategories();
    return Response.json(categories);
} 