export const generateStructuredData = (type: string, data: Record<string, any>) => {
    const baseData = {
        '@context': 'https://schema.org',
        '@type': type,
    };

    return {
        ...baseData,
        ...data,
    };
};

export const generateProductStructuredData = (product: {
    name: string;
    description: string;
    image: string;
    price?: number;
}) => {
    return generateStructuredData('Product', {
        name: product.name,
        description: product.description,
        image: product.image,
        offers: product.price ? {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'AED',
        } : undefined,
    });
};

export const generateOrganizationData = () => {
    return generateStructuredData('Organization', {
        name: 'Hikvision Dubai',
        url: 'https://hikvisiondubai.ae',
        description: 'Professional Security Solutions in Dubai',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Dubai',
            addressCountry: 'AE',
        },
    });
};
