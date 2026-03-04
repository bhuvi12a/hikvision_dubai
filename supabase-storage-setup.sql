-- =============================================
-- Supabase Storage Setup for Images Bucket
-- Run this in Supabase Dashboard → SQL Editor
-- =============================================

-- 1. Create the 'images' bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'images',
    'images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. Allow anyone to READ/VIEW images (public access)
CREATE POLICY "Allow public read access on images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- 3. Allow anyone to UPLOAD images
CREATE POLICY "Allow public upload access on images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- 4. Allow anyone to UPDATE images
CREATE POLICY "Allow public update access on images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

-- 5. Allow anyone to DELETE images
CREATE POLICY "Allow public delete access on images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');
