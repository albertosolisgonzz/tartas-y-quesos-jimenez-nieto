import Client from 'shopify-buy';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = '2024-10';

// Only create client if credentials exist (lo usa el checkout del carrito en el navegador)
export const shopifyClient = domain && storefrontAccessToken
    ? Client.buildClient({
        domain,
        storefrontAccessToken,
        apiVersion: API_VERSION,
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

// ——— Storefront GraphQL directo ———
// Sustituye a shopify-buy para leer productos: la librería fallaba en
// silencio durante el build de Vercel y la web se generaba con los mocks.

type GqlProduct = {
    id: string;
    title: string;
    handle: string;
    description: string;
    productType: string;
    images: { nodes: { url: string }[] };
    variants: { nodes: { id: string; price: { amount: string; currencyCode: string } }[] };
};

const PRODUCT_FIELDS = `
    id
    title
    handle
    description
    productType
    images(first: 10) {
        nodes {
            url
        }
    }
    variants(first: 20) {
        nodes {
            id
            price {
                amount
                currencyCode
            }
        }
    }
`;

async function storefrontQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
    if (!domain || !storefrontAccessToken) {
        return null;
    }

    try {
        const response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            console.error(`[shopify] Storefront API HTTP ${response.status}`);
            return null;
        }

        const json = await response.json();
        if (json.errors) {
            console.error('[shopify] Storefront API errors:', JSON.stringify(json.errors));
            return null;
        }

        return json.data as T;
    } catch (error) {
        console.error('[shopify] Storefront API fetch failed:', error);
        return null;
    }
}

function normalizeGqlProduct(product: GqlProduct): NormalizedProduct {
    return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description || '',
        productType: product.productType || '',
        images: product.images.nodes.map((image) => ({ src: image.url })),
        variants: product.variants.nodes.map((variant) => ({
            id: variant.id,
            price: {
                amount: variant.price.amount,
                currencyCode: variant.price.currencyCode,
            },
        })),
    };
}

export async function getAllProducts(): Promise<NormalizedProduct[]> {
    const data = await storefrontQuery<{ products: { nodes: GqlProduct[] } }>(`
        query AllProducts {
            products(first: 100) {
                nodes {
                    ${PRODUCT_FIELDS}
                }
            }
        }
    `);

    if (!data) {
        return MOCK_PRODUCTS;
    }

    return data.products.nodes.map(normalizeGqlProduct);
}


export async function getProductByHandle(handle: string): Promise<NormalizedProduct | null> {
    if (!domain || !storefrontAccessToken) {
        return MOCK_PRODUCTS.find(p => p.handle === handle) || null;
    }

    const data = await storefrontQuery<{ product: GqlProduct | null }>(`
        query ProductByHandle($handle: String!) {
            product(handle: $handle) {
                ${PRODUCT_FIELDS}
            }
        }
    `, { handle });

    if (!data) {
        return null;
    }

    return data.product ? normalizeGqlProduct(data.product) : null;
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

    // Keywords to match for each category (include/exclude)
    const keywords: Record<string, { include: string[]; exclude: string[] }> = {
        'tartas': {
            include: ['tarta', 'tartas', 'cake', 'cheesecake'],
            exclude: []
        },
        'quesos': {
            include: ['queso', 'quesos', 'cheese'],
            exclude: ['crema', 'cremas', 'tarta', 'tartas']
        },
        'cremas': {
            include: ['crema', 'cremas', 'cream', 'untable'],
            exclude: []
        },
    };

    const config = keywords[categorySlug] || { include: [category.productType.toLowerCase()], exclude: [] };

    return allProducts.filter(p => {
        const titleLower = p.title.toLowerCase();
        const productTypeLower = p.productType?.toLowerCase() || '';

        // Exclude first
        if (config.exclude.some(keyword => titleLower.includes(keyword))) {
            return false;
        }

        // Match if productType matches OR title contains any keyword
        return productTypeLower === category.productType.toLowerCase() ||
            config.include.some(keyword => titleLower.includes(keyword));
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
