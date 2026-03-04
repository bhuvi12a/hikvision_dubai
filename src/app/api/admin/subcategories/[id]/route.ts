import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

// Admin GET single subcategory (including inactive)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { data, error } = await supabase
            .from('sub_categories')
            .select(`
                *,
                category:categories(*)
            `)
            .eq('id', id)
            .single();

        if (error || !data) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });

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
        });
    } catch (error) {
        console.error('Admin subcategory GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch subcategory' }, { status: 500 });
    }
}

// Admin PUT - update a subcategory
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        if (body.name !== undefined) updateData.name = body.name;
        if (body.slug !== undefined) {
            // Check for duplicate slug (excluding current)
            const { data: existing } = await supabase
                .from('sub_categories')
                .select('id')
                .eq('slug', body.slug)
                .neq('id', id)
                .maybeSingle();
            if (existing) {
                return NextResponse.json({ error: 'A subcategory with this slug already exists' }, { status: 409 });
            }
            updateData.slug = body.slug;
        }
        if (body.description !== undefined) updateData.description = body.description;
        if (body.image !== undefined) updateData.image = body.image;
        if (body.category !== undefined) updateData.category_id = body.category;
        if (body.isActive !== undefined) updateData.is_active = body.isActive;

        const { data, error } = await supabase
            .from('sub_categories')
            .update(updateData)
            .eq('id', id)
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
        });
    } catch (error) {
        console.error('Admin subcategory PUT error:', error);
        return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
    }
}

// Admin DELETE - delete a subcategory
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Check if subcategory has products
        const { count } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true })
            .eq('sub_category_id', id);

        if (count && count > 0) {
            return NextResponse.json({
                error: `Cannot delete: ${count} product(s) are using this subcategory. Please reassign them first.`
            }, { status: 400 });
        }

        const { error } = await supabase
            .from('sub_categories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        console.error('Admin subcategory DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
    }
}
