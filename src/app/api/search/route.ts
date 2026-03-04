import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';

        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                category:categories(*),
                sub_category:sub_categories(*)
            `)
            .eq('is_active', true)
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .limit(20);

        if (error) throw error;

        const mapped = (data || []).map(item => ({
            _id: item.id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            specifications: item.specifications,
            price: item.price,
            images: item.images || [],
            category: item.category ? {
                _id: item.category.id,
                name: item.category.name,
                slug: item.category.slug,
            } : null,
            subCategory: item.sub_category ? {
                _id: item.sub_category.id,
                name: item.sub_category.name,
                slug: item.sub_category.slug,
            } : null,
            isActive: item.is_active,
            isFeatured: item.is_featured,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
        }));

        return NextResponse.json(mapped);
    } catch (error) {
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
