import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                category:categories(*),
                sub_category:sub_categories(*)
            `)
            .eq('is_active', true);

        if (error) throw error;

        const mapped = (data || []).map(item => ({
            _id: item.id,
            name: item.name,
            slug: item.slug,
            modelNumber: item.model_number,
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
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('products')
            .insert({
                name: body.name,
                slug: body.slug,
                model_number: body.modelNumber || null,
                description: body.description,
                specifications: body.specifications,
                price: body.price,
                images: body.images || [],
                category_id: body.category || null,
                sub_category_id: body.subCategory || null,
                is_active: body.isActive !== undefined ? body.isActive : true,
                is_featured: body.isFeatured || false,
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            slug: data.slug,
            modelNumber: data.model_number,
            description: data.description,
            specifications: data.specifications,
            price: data.price,
            images: data.images,
            isActive: data.is_active,
            isFeatured: data.is_featured,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
