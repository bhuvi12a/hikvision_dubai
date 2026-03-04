import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

// Admin GET single contact
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return NextResponse.json({ error: 'Contact not found' }, { status: 404 });

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
        });
    } catch (error) {
        console.error('Admin contact GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
    }
}

// Admin PUT - mark as read/unread
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        if (body.isRead !== undefined) updateData.is_read = body.isRead;

        const { data, error } = await supabase
            .from('contacts')
            .update(updateData)
            .eq('id', id)
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
        });
    } catch (error) {
        console.error('Admin contact PUT error:', error);
        return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
    }
}

// Admin DELETE
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Admin contact DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
    }
}
