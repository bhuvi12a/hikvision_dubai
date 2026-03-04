import { MetadataRoute } from 'next';
import connectDB from './config/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hikvisiondubai.ae';

    const staticPages = [
        { url: baseUrl, lastModified: new Date(), priority: 1 },
        { url: `${baseUrl}/About`, lastModified: new Date(), priority: 0.8 },
        { url: `${baseUrl}/Contact`, lastModified: new Date(), priority: 0.8 },
        { url: `${baseUrl}/Education`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/Healthcare`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/Manufacturing`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/Retail`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/Acusense`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/Colorvu`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/Darkfighter`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/Tandemvu`, lastModified: new Date(), priority: 0.7 },
    ];

    return staticPages;
}
