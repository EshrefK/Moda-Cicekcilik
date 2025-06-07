import { getAllCategoryGroups } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const categoryGroups = await getAllCategoryGroups();
        return NextResponse.json(categoryGroups);
    } catch (error) {
        console.error('Error fetching category groups:', error);
        return NextResponse.json([], { status: 200 }); // Return empty array instead of error
    }
} 