export interface IProduct {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    specifications?: string;
    price?: number;
    images: string[];
    category?: string;
    subCategory?: string;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}
