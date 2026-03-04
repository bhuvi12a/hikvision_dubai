import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

// Admin GET - returns ALL contacts with filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const isRead = searchParams.get('isRead') || '';

        let query = supabase
            .from('contacts')
            .select('*');

        // Apply filters
        if (isRead === 'true') query = query.eq('is_read', true);
        if (isRead === 'false') query = query.eq('is_read', false);
        if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%`);

        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;

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
        console.error('Admin contacts GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}
