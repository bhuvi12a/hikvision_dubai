import { NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hikvisiondubai.ae';

        const [productsRes, categoriesRes] = await Promise.all([
            supabase.from('products').select('slug, updated_at').eq('is_active', true),
            supabase.from('categories').select('slug, updated_at').eq('is_active', true),
        ]);

        const products = productsRes.data || [];
        const categories = categoriesRes.data || [];

        const urls = [
            { loc: baseUrl, lastmod: new Date().toISOString(), priority: '1.0' },
            ...categories.map(cat => ({
                loc: `${baseUrl}/${cat.slug}`,
                lastmod: cat.updated_at,
                priority: '0.8',
            })),
            ...products.map(product => ({
                loc: `${baseUrl}/products/${product.slug}`,
                lastmod: product.updated_at,
                priority: '0.6',
            })),
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

        return new NextResponse(sitemap, {
            headers: { 'Content-Type': 'application/xml' },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 });
    }
}
