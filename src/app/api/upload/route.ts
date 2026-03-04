import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/app/utils/supabaseStorage';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const result = await uploadImage(file);
        return NextResponse.json({ url: result.url, path: result.path });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
