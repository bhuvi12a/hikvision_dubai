import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

// Admin GET - returns ALL subcategories (including inactive)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const categoryId = searchParams.get('category') || '';

        let query = supabase
            .from('sub_categories')
            .select(`
                *,
                category:categories(*)
            `);

        // Apply filters
        if (status === 'active') query = query.eq('is_active', true);
        if (status === 'inactive') query = query.eq('is_active', false);
        if (categoryId) query = query.eq('category_id', categoryId);
        if (search) query = query.ilike('name', `%${search}%`);

        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;

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
        console.error('Admin subcategories GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
    }
}

// Admin POST - create a subcategory
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.name || !body.category) {
            return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
        }

        const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Check for duplicate slug
        const { data: existing } = await supabase
            .from('sub_categories')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();

        if (existing) {
            return NextResponse.json({ error: 'A subcategory with this slug already exists' }, { status: 409 });
        }

        const { data, error } = await supabase
            .from('sub_categories')
            .insert({
                name: body.name,
                slug,
                description: body.description || null,
                image: body.image || null,
                category_id: body.category,
                is_active: body.isActive !== undefined ? body.isActive : true,
            })
            .select(`
                *,
                category:categories(*)
            `)
            .single();

        if (error) throw error;

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            image: data.image,
            category: data.category ? {
                _id: data.category.id,
                name: data.category.name,
                slug: data.category.slug,
            } : null,
            isActive: data.is_active,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        }, { status: 201 });
    } catch (error) {
        console.error('Admin subcategories POST error:', error);
        return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
    }
}
