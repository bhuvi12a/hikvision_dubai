import { NextResponse } from 'next/server';

export function seoHeaders(response: NextResponse) {
    response.headers.set('X-Robots-Tag', 'index, follow');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    return response;
}
