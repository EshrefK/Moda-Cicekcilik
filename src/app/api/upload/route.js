import { writeFile, unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get('file');
    const previousImagePath = formData.get('previousImagePath');

    if (!file) {
        return NextResponse.json(
            { error: 'Dosya yüklenmedi' },
            { status: 400 }
        );
    }

    if (previousImagePath) {
        
        const previousFilePath = path.join(process.cwd(), 'public', previousImagePath);
        await unlink(previousFilePath);
        
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save the file
    const filepath = path.join(process.cwd(), 'public', 'cicekler', filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({ 
        path: `/cicekler/${filename}`
    });
} 