import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

        if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

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
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        if (body.name !== undefined) updateData.name = body.name;
        if (body.slug !== undefined) updateData.slug = body.slug;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.image !== undefined) updateData.image = body.image;
        if (body.category !== undefined) updateData.category_id = body.category;
        if (body.isActive !== undefined) updateData.is_active = body.isActive;

        const { data, error } = await supabase
            .from('sub_categories')
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
            image: data.image,
            isActive: data.is_active,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const { error } = await supabase
            .from('sub_categories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
