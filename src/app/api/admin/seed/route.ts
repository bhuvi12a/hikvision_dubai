import { NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';
import bcrypt from 'bcryptjs';

export async function POST() {
    try {
        // Check if an admin already exists
        const { data: existing } = await supabase
            .from('admins')
            .select('id')
            .eq('username', 'admin')
            .single();

        if (existing) {
            return NextResponse.json(
                { message: 'Admin already exists' },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash('admin', 10);

        const { data, error } = await supabase
            .from('admins')
            .insert({
                username: 'admin',
                email: 'admin@hikvision-dubai.com',
                password: hashedPassword,
                role: 'admin',
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({
            message: 'Admin created successfully',
            credentials: {
                username: 'admin',
                password: 'admin',
            },
        });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json(
            { error: 'Failed to create admin' },
            { status: 500 }
        );
    }
}
