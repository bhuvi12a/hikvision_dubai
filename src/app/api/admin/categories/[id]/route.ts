import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

// Admin GET single category (including inactive)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { data, error } = await supabase
            .from('categories')
            .select(`
                *,
                navbar_category:navbar_categories(*)
            `)
            .eq('id', id)
            .single();

        if (error || !data) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            image: data.image,
            navbarCategory: data.navbar_category ? {
                _id: data.navbar_category.id,
                name: data.navbar_category.name,
                slug: data.navbar_category.slug,
            } : null,
            isActive: data.is_active,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        });
    } catch (error) {
        console.error('Admin category GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
    }
}

// Admin PUT - update a category
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        if (body.name !== undefined) updateData.name = body.name;
        if (body.slug !== undefined) {
            // Check for duplicate slug (excluding current category)
            const { data: existing } = await supabase
                .from('categories')
                .select('id')
                .eq('slug', body.slug)
                .neq('id', id)
                .maybeSingle();
            if (existing) {
                return NextResponse.json({ error: 'A category with this slug already exists' }, { status: 409 });
            }
            updateData.slug = body.slug;
        }
        if (body.description !== undefined) updateData.description = body.description;
        if (body.image !== undefined) updateData.image = body.image;
        if (body.navbarCategory !== undefined) updateData.navbar_category_id = body.navbarCategory;
        if (body.isActive !== undefined) updateData.is_active = body.isActive;

        const { data, error } = await supabase
            .from('categories')
            .update(updateData)
            .eq('id', id)
            .select(`
                *,
                navbar_category:navbar_categories(*)
            `)
            .single();

        if (error) throw error;

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            image: data.image,
            navbarCategory: data.navbar_category ? {
                _id: data.navbar_category.id,
                name: data.navbar_category.name,
                slug: data.navbar_category.slug,
            } : null,
            isActive: data.is_active,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        });
    } catch (error) {
        console.error('Admin category PUT error:', error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

// Admin DELETE - delete a category
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Check if category has products
        const { count } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true })
            .eq('category_id', id);

        if (count && count > 0) {
            return NextResponse.json({
                error: `Cannot delete: ${count} product(s) are using this category. Please reassign them first.`
            }, { status: 400 });
        }

        // Check if category has subcategories
        const { count: subCount } = await supabase
            .from('sub_categories')
            .select('id', { count: 'exact', head: true })
            .eq('category_id', id);

        if (subCount && subCount > 0) {
            return NextResponse.json({
                error: `Cannot delete: ${subCount} subcategory(ies) are under this category. Please delete them first.`
            }, { status: 400 });
        }

        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Admin category DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
