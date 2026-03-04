import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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
        return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Contact deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
    }
}
