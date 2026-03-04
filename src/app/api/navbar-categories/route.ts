import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('navbar_categories')
            .select('*')
            .eq('is_active', true)
            .order('order', { ascending: true });

        if (error) throw error;

        // Map to match frontend expected format
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
        return NextResponse.json({ error: 'Failed to fetch navbar categories' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('navbar_categories')
            .insert({
                name: body.name,
                slug: body.slug,
                description: body.description,
                order: body.order || 0,
                is_active: body.isActive !== undefined ? body.isActive : true,
            })
            .select()
            .single();

        if (error) throw error;

        const mapped = {
            _id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            order: data.order,
            isActive: data.is_active,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };

        return NextResponse.json(mapped, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create navbar category' }, { status: 500 });
    }
}
