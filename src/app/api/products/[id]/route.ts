import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                category:categories(*),
                sub_category:sub_categories(*)
            `)
            .eq('id', id)
            .single();

        if (error || !data) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            slug: data.slug,
            modelNumber: data.model_number,
            description: data.description,
            specifications: data.specifications,
            price: data.price,
            images: data.images || [],
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
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        if (body.name !== undefined) updateData.name = body.name;
        if (body.slug !== undefined) updateData.slug = body.slug;
        if (body.modelNumber !== undefined) updateData.model_number = body.modelNumber;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.specifications !== undefined) updateData.specifications = body.specifications;
        if (body.price !== undefined) updateData.price = body.price;
        if (body.images !== undefined) updateData.images = body.images;
        if (body.category !== undefined) updateData.category_id = body.category;
        if (body.subCategory !== undefined) updateData.sub_category_id = body.subCategory;
        if (body.isActive !== undefined) updateData.is_active = body.isActive;
        if (body.isFeatured !== undefined) updateData.is_featured = body.isFeatured;

        const { data, error } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', id)
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
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
