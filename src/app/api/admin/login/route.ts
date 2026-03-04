import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        const { email, password, username } = await request.json();

        // Support login by email or username
        let query = supabase.from('admins').select('*');
        if (email) {
            query = query.eq('email', email);
        } else if (username) {
            query = query.eq('username', username);
        } else {
            return NextResponse.json({ error: 'Email or username required' }, { status: 400 });
        }

        const { data: admin, error } = await query.single();

        if (error || !admin) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        const response = NextResponse.json({ message: 'Login successful' });
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
