import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = await params;
        const { data, error } = await supabase
            .from('navbar_categories')
            .select('*')
            .eq('slug', slug)
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
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
