import Client from 'shopify-buy';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Only create client if credentials exist
export const shopifyClient = domain && storefrontAccessToken
    ? Client.buildClient({
        domain,
        storefrontAccessToken,
        apiVersion: '2024-10',
    })
    : null;

// Type for normalized product
export type NormalizedProduct = {
    id: string;
    title: string;
    handle: string;
    description: string;
    productType: string;
    images: { src: string }[];
    variants: { id: string; price: { amount: string; currencyCode: string } }[];
};

// Mock Data for development without API keys
const MOCK_PRODUCTS: NormalizedProduct[] = [
    {
        id: 'gid://shopify/Product/1',
        title: 'Tarta de Queso Clásica',
        handle: 'tarta-queso-clasica',
        description: 'Nuestra famosa tarta de queso, cremosa y con el tostado perfecto.',
        productType: 'Tartas',
        images: [{ src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800' }],
        variants: [{ id: 'v1', price: { amount: '25.00', currencyCode: 'EUR' } }]
    },
    {
        id: 'gid://shopify/Product/2',
        title: 'Queso Manchego Curado',
        handle: 'queso-manchego-curado',
        description: 'Curación de 12 meses. Sabor intenso y textura firme.',
        productType: 'Quesos',
        images: [{ src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800' }],
        variants: [{ id: 'v2', price: { amount: '18.50', currencyCode: 'EUR' } }]
    }
];

// Normalize Shopify SDK product to our format
function normalizeProduct(product: any): NormalizedProduct {
    return {
        id: product.id?.toString() || '',
        title: product.title || '',
        handle: product.handle || '',
        description: product.description || product.descriptionHtml || '',
        productType: product.productType || '',
        images: product.images?.map((img: any) => ({
            src: img.src || img.url || ''
        })) || [],
        variants: product.variants?.map((v: any) => ({
            id: v.id?.toString() || '',
            price: {
                amount: v.price?.amount || v.priceV2?.amount || v.price || '0',
                currencyCode: v.price?.currencyCode || v.priceV2?.currencyCode || 'EUR'
            }
        })) || []
    };
}

export async function getAllProducts(): Promise<NormalizedProduct[]> {
    // Use mock data if no client configured
    if (!shopifyClient) {
        return MOCK_PRODUCTS;
    }

    try {
        const products = await shopifyClient.product.fetchAll();
        return products.map(normalizeProduct);
    } catch (error) {
        console.error('Error fetching products from Shopify:', error);
        return MOCK_PRODUCTS;
    }
}


export async function getProductByHandle(handle: string): Promise<NormalizedProduct | null> {
    if (!shopifyClient) {
        return MOCK_PRODUCTS.find(p => p.handle === handle) || null;
    }

    try {
        const product = await shopifyClient.product.fetchByHandle(handle);
        return product ? normalizeProduct(product) : null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Available categories for filtering
export const CATEGORIES = [
    { slug: 'tartas', label: 'Tartas', productType: 'Tartas' },
    { slug: 'quesos', label: 'Quesos', productType: 'Quesos' },
    { slug: 'cremas', label: 'Cremas', productType: 'Cremas' },
] as const;

export type CategorySlug = typeof CATEGORIES[number]['slug'];

export async function getProductsByCategory(categorySlug: string): Promise<NormalizedProduct[]> {
    const category = CATEGORIES.find(c => c.slug === categorySlug);
    if (!category) {
        return [];
    }

    const allProducts = await getAllProducts();

    // Keywords to match for each category
    const keywords: Record<string, string[]> = {
        'tartas': ['tarta', 'tartas', 'cake', 'cheesecake'],
        'quesos': ['queso', 'quesos', 'cheese'],
        'cremas': ['crema', 'cremas', 'cream', 'untable'],
    };

    const categoryKeywords = keywords[categorySlug] || [category.productType.toLowerCase()];

    return allProducts.filter(p => {
        const titleLower = p.title.toLowerCase();
        const productTypeLower = p.productType?.toLowerCase() || '';

        // Match if productType matches OR title contains any keyword
        return productTypeLower === category.productType.toLowerCase() ||
            categoryKeywords.some(keyword => titleLower.includes(keyword));
    });
}


export async function getAvailableCategories(): Promise<{ slug: string; label: string; count: number }[]> {
    const allProducts = await getAllProducts();

    return CATEGORIES.map(cat => ({
        slug: cat.slug,
        label: cat.label,
        count: allProducts.filter(p =>
            p.productType.toLowerCase() === cat.productType.toLowerCase()
        ).length
    })).filter(cat => cat.count > 0);
}

