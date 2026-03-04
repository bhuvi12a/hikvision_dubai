import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select(`
                *,
                navbar_category:navbar_categories(*)
            `)
            .eq('is_active', true);

        if (error) throw error;

        const mapped = (data || []).map(item => ({
            _id: item.id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            image: item.image,
            navbarCategory: item.navbar_category ? {
                _id: item.navbar_category.id,
                name: item.navbar_category.name,
                slug: item.navbar_category.slug,
            } : null,
            isActive: item.is_active,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
        }));

        return NextResponse.json(mapped);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('categories')
            .insert({
                name: body.name,
                slug: body.slug,
                description: body.description,
                image: body.image,
                navbar_category_id: body.navbarCategory || null,
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
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
