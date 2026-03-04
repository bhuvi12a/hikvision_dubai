import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

// Admin GET single navbar category
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { data, error } = await supabase
            .from('navbar_categories')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            order: data.order,
            isActive: data.is_active,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        });
    } catch (error) {
        console.error('Admin navbar-category GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

// Admin PUT - update a navbar category
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        if (body.name !== undefined) updateData.name = body.name;
        if (body.slug !== undefined) {
            // Check for duplicate slug (excluding current)
            const { data: existing } = await supabase
                .from('navbar_categories')
                .select('id')
                .eq('slug', body.slug)
                .neq('id', id)
                .maybeSingle();
            if (existing) {
                return NextResponse.json({ error: 'A navbar category with this slug already exists' }, { status: 409 });
            }
            updateData.slug = body.slug;
        }
        if (body.description !== undefined) updateData.description = body.description;
        if (body.order !== undefined) updateData.order = body.order;
        if (body.isActive !== undefined) updateData.is_active = body.isActive;

        const { data, error } = await supabase
            .from('navbar_categories')
            .update(updateData)
            .eq('id', id)
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
        });
    } catch (error) {
        console.error('Admin navbar-category PUT error:', error);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

// Admin DELETE - delete a navbar category
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Check if navbar category has categories
        const { count } = await supabase
            .from('categories')
            .select('id', { count: 'exact', head: true })
            .eq('navbar_category_id', id);

        if (count && count > 0) {
            return NextResponse.json({
                error: `Cannot delete: ${count} category(ies) are under this navbar category. Please reassign them first.`
            }, { status: 400 });
        }

        const { error } = await supabase
            .from('navbar_categories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Navbar category deleted successfully' });
    } catch (error) {
        console.error('Admin navbar-category DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
