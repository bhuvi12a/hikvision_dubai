import { NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';

export async function GET() {
    try {
        const [productsRes, categoriesRes, subCategoriesRes, contactsRes] = await Promise.all([
            supabase.from('products').select('id', { count: 'exact', head: true }),
            supabase.from('categories').select('id', { count: 'exact', head: true }),
            supabase.from('sub_categories').select('id', { count: 'exact', head: true }),
            supabase.from('contacts').select('id', { count: 'exact', head: true }),
        ]);

        return NextResponse.json({
            products: productsRes.count || 0,
            categories: categoriesRes.count || 0,
            subCategories: subCategoriesRes.count || 0,
            contacts: contactsRes.count || 0,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
