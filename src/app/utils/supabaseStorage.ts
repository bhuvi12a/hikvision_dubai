import supabase from '@/app/config/supabase';

const BUCKET_NAME = 'images';

/**
 * Upload an image to Supabase Storage
 * @param file - The File object to upload
 * @param folder - The folder path within the bucket (e.g. 'products', 'categories')
 * @returns Object with url and path
 */
export const uploadImage = async (file: File, folder: string = 'general') => {
    try {
        // Generate a unique filename
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const fileName = `${folder}/${timestamp}-${randomStr}.${fileExt}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type,
            });

        if (error) {
            console.error('Supabase Storage upload error:', error);
            throw error;
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

        return {
            url: urlData.publicUrl,
            path: data.path,
        };
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};

/**
 * Delete an image from Supabase Storage
 * @param path - The file path within the bucket
 */
export const deleteImage = async (path: string) => {
    try {
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([path]);

        if (error) {
            console.error('Supabase Storage delete error:', error);
            throw error;
        }

        return { result: 'ok' };
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
};

/**
 * Delete multiple images from Supabase Storage
 * @param paths - Array of file paths within the bucket
 */
export const deleteImages = async (paths: string[]) => {
    try {
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove(paths);

        if (error) {
            console.error('Supabase Storage bulk delete error:', error);
            throw error;
        }

        return { result: 'ok', count: paths.length };
    } catch (error) {
        console.error('Bulk delete error:', error);
        throw error;
    }
};
