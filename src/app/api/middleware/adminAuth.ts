import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function adminAuth(request: NextRequest) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
        return { error: 'Not authenticated', status: 401 };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return { user: decoded };
    } catch {
        return { error: 'Invalid token', status: 401 };
    }
}
