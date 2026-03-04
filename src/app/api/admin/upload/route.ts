import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, deleteImage } from '@/app/utils/supabaseStorage';

// Admin POST - upload one or multiple images to Supabase Storage
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files') as File[];
        const singleFile = formData.get('file') as File | null;
        const folder = (formData.get('folder') as string) || 'general';

        // Support both single 'file' and multiple 'files' field names
        const allFiles = singleFile ? [singleFile, ...files] : files;

        if (allFiles.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        // Validate file types
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
        for (const file of allFiles) {
            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json({
                    error: `Invalid file type: ${file.type}. Allowed types: JPEG, PNG, WebP, GIF, SVG`
                }, { status: 400 });
            }
            // 10MB limit per file
            if (file.size > 10 * 1024 * 1024) {
                return NextResponse.json({
                    error: `File "${file.name}" exceeds 10MB limit`
                }, { status: 400 });
            }
        }

        const uploadResults = [];

        for (const file of allFiles) {
            const result = await uploadImage(file, folder);
            uploadResults.push({
                url: result.url,
                path: result.path,
                originalName: file.name,
            });
        }

        // Return single object for single upload, array for multiple
        if (uploadResults.length === 1) {
            return NextResponse.json(uploadResults[0]);
        }

        return NextResponse.json({
            images: uploadResults,
            count: uploadResults.length,
        });
    } catch (error) {
        console.error('Admin upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

// Admin DELETE - delete an image from Supabase Storage
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { path, paths } = body;

        if (!path && (!paths || !Array.isArray(paths) || paths.length === 0)) {
            return NextResponse.json({ error: 'path or paths is required' }, { status: 400 });
        }

        const pathsToDelete = path ? [path] : paths;
        const results = [];

        for (const p of pathsToDelete) {
            try {
                const result = await deleteImage(p);
                results.push({ path: p, status: 'deleted', result: result.result });
            } catch (err) {
                results.push({ path: p, status: 'failed', error: String(err) });
            }
        }

        return NextResponse.json({
            message: `${results.filter(r => r.status === 'deleted').length} of ${pathsToDelete.length} image(s) deleted`,
            results,
        });
    } catch (error) {
        console.error('Admin delete image error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
