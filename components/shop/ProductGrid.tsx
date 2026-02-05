'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters, ProductType, SortOption } from './ProductFilters';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    handle: string;
    productType?: string;
    variants: { id: string; price: { amount: string; currencyCode: string } }[];
    images: { src: string }[];
}

interface ProductGridProps {
    products: Product[];
    limit?: number;
    showFilters?: boolean;
    showViewAll?: boolean;
}

export function ProductGrid({
    products,
    limit,
    showFilters = true,
    showViewAll = false,
}: ProductGridProps) {
    const [activeType, setActiveType] = useState<ProductType>('all');
    const [sortBy, setSortBy] = useState<SortOption>('default');

    // Filter and sort products
    const processedProducts = useMemo(() => {
        let result = [...products];

        // Apply type filter
        if (activeType !== 'all') {
            result = result.filter((product) => {
                const type = product.productType?.toLowerCase() || '';
                const title = product.title.toLowerCase();

                if (activeType === 'cremas') {
                    return type.includes('crema') || title.includes('crema');
                }
                if (activeType === 'tartas') {
                    return type.includes('tarta') || title.includes('tarta');
                }
                if (activeType === 'quesos') {
                    return type.includes('queso') || title.includes('queso');
                }
                return true;
            });
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) =>
                    parseFloat(a.variants[0]?.price.amount || '0') -
                    parseFloat(b.variants[0]?.price.amount || '0')
                );
                break;
            case 'price-desc':
                result.sort((a, b) =>
                    parseFloat(b.variants[0]?.price.amount || '0') -
                    parseFloat(a.variants[0]?.price.amount || '0')
                );
                break;
            case 'name-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        // Apply limit if specified
        if (limit && limit > 0) {
            result = result.slice(0, limit);
        }

        return result;
    }, [products, activeType, sortBy, limit]);

    return (
        <div>
            {/* Filters */}
            {showFilters && (
                <ProductFilters
                    activeType={activeType}
                    sortBy={sortBy}
                    onTypeChange={setActiveType}
                    onSortChange={setSortBy}
                />
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {processedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        handle={product.handle}
                        price={product.variants[0]?.price.amount || '0'}
                        currency={product.variants[0]?.price.currencyCode || 'EUR'}
                        images={product.images || []}
                    />
                ))}
            </div>

            {/* No products message */}
            {processedProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-stone-500">No se encontraron productos.</p>
                </div>
            )}

            {/* View All Button */}
            {showViewAll && processedProducts.length > 0 && (
                <div className="text-center mt-8">
                    <Link
                        href="/collections/all"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-800 transition-colors rounded-sm"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Ver Todos los Productos
                    </Link>
                </div>
            )}
        </div>
    );
}
