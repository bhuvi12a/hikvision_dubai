import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

// Admin GET - returns ALL navbar categories (including inactive)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('navbar_categories')
            .select('*')
            .order('order', { ascending: true });

        if (error) throw error;

        const mapped = (data || []).map(item => ({
            _id: item.id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            order: item.order,
            isActive: item.is_active,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
        }));

        return NextResponse.json(mapped);
    } catch (error) {
        console.error('Admin navbar-categories GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch navbar categories' }, { status: 500 });
    }
}

// Admin POST - create a navbar category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Check for duplicate slug
        const { data: existing } = await supabase
            .from('navbar_categories')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();

        if (existing) {
            return NextResponse.json({ error: 'A navbar category with this slug already exists' }, { status: 409 });
        }

        const { data, error } = await supabase
            .from('navbar_categories')
            .insert({
                name: body.name,
                slug,
                description: body.description || null,
                order: body.order || 0,
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
            order: data.order,
            isActive: data.is_active,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        }, { status: 201 });
    } catch (error) {
        console.error('Admin navbar-categories POST error:', error);
        return NextResponse.json({ error: 'Failed to create navbar category' }, { status: 500 });
    }
}
