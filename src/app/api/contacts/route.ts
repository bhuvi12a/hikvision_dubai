import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const mapped = (data || []).map(item => ({
            _id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            subject: item.subject,
            message: item.message,
            isRead: item.is_read,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
        }));

        return NextResponse.json(mapped);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('contacts')
            .insert({
                name: body.name,
                email: body.email,
                phone: body.phone,
                subject: body.subject,
                message: body.message,
                is_read: false,
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({
            _id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
            isRead: data.is_read,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
    }
}
