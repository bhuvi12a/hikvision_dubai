import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

// Admin GET - returns ALL products (including inactive)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const categoryId = searchParams.get('category') || '';
        const status = searchParams.get('status') || ''; // 'active', 'inactive', or '' for all
        const featured = searchParams.get('featured') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = (page - 1) * limit;

        let query = supabase
            .from('products')
            .select(`
                *,
                category:categories(*),
                sub_category:sub_categories(*)
            `, { count: 'exact' });

        // Apply filters
        if (status === 'active') query = query.eq('is_active', true);
        if (status === 'inactive') query = query.eq('is_active', false);
        if (featured === 'true') query = query.eq('is_featured', true);
        if (categoryId) query = query.eq('category_id', categoryId);
        if (search) query = query.ilike('name', `%${search}%`);

        // Apply pagination & ordering
        query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

        const { data, error, count } = await query;

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

        return NextResponse.json({
            products: mapped,
            total: count || 0,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit),
        });
    } catch (error) {
        console.error('Admin products GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// Admin POST - create a product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.name || !body.slug) {
            return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
        }

        // Check for duplicate slug
        const { data: existing } = await supabase
            .from('products')
            .select('id')
            .eq('slug', body.slug)
            .maybeSingle();

        if (existing) {
            return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 409 });
        }

        const { data, error } = await supabase
            .from('products')
            .insert({
                name: body.name,
                slug: body.slug,
                model_number: body.modelNumber || null,
                description: body.description || null,
                specifications: body.specifications || null,
                price: body.price || null,
                images: body.images || [],
                category_id: body.category || null,
                sub_category_id: body.subCategory || null,
                is_active: body.isActive !== undefined ? body.isActive : true,
                is_featured: body.isFeatured || false,
            })
            .select(`
                *,
                category:categories(*),
                sub_category:sub_categories(*)
            `)
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
        }, { status: 201 });
    } catch (error: unknown) {
        const err = error as { message?: string; code?: string; details?: string; hint?: string };
        console.error('Admin products POST error:', JSON.stringify({ message: err.message, code: err.code, details: err.details, hint: err.hint }, null, 2));
        return NextResponse.json({ error: err.message || 'Failed to create product', code: err.code, details: err.details }, { status: 500 });
    }
}
