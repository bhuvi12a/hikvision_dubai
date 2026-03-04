import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'uploads', params.filename);
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
        const file = fs.readFileSync(filePath);
        return new NextResponse(file);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
    }
}
