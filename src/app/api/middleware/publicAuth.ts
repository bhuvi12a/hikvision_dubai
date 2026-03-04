import { NextRequest } from 'next/server';

export function publicAuth(request: NextRequest) {
    // Public routes don't require authentication
    // But we can still extract user info if available
    const token = request.cookies.get('admin_token')?.value;
    return { isPublic: true, hasToken: !!token };
}
