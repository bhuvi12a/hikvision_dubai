import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = await params;
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                category:categories(*),
                sub_category:sub_categories(*)
            `)
            .eq('slug', slug)
            .single();

        if (error || !data) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            specifications: data.specifications,
            price: data.price,
            images: data.images || [],
            category: data.category ? {
                _id: data.category.id,
                name: data.category.name,
                slug: data.category.slug,
            } : null,
            subCategory: data.sub_category ? {
                _id: data.sub_category.id,
                name: data.sub_category.name,
                slug: data.sub_category.slug,
            } : null,
            isActive: data.is_active,
            isFeatured: data.is_featured,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
