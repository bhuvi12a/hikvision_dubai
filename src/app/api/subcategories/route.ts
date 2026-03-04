import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('sub_categories')
            .select(`
                *,
                category:categories(*)
            `)
            .eq('is_active', true);

        if (error) throw error;

        const mapped = (data || []).map(item => ({
            _id: item.id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            image: item.image,
            category: item.category ? {
                _id: item.category.id,
                name: item.category.name,
                slug: item.category.slug,
            } : null,
            isActive: item.is_active,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
        }));

        return NextResponse.json(mapped);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('sub_categories')
            .insert({
                name: body.name,
                slug: body.slug,
                description: body.description,
                image: body.image,
                category_id: body.category,
                is_active: body.isActive !== undefined ? body.isActive : true,
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            image: data.image,
            isActive: data.is_active,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
    }
}
