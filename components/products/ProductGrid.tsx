'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NormalizedProduct } from '@/lib/shopify';
import { useCart } from '@/components/cart/CartContext';

interface ProductGridProps {
    products: NormalizedProduct[];
    categoryLabel: string;
}

export function ProductGrid({ products, categoryLabel }: ProductGridProps) {
    const { addToCart } = useCart();

    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-stone-500 text-lg">No hay productos disponibles en esta categoría.</p>
                <Link href="/collections/all" className="mt-4 inline-block text-amber-700 hover:underline">
                    Ver todos los productos
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
                <div key={product.id} className="group">
                    <Link href={`/products/${product.handle}`} className="block">
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 mb-4">
                            {product.images[0]?.src ? (
                                <Image
                                    src={product.images[0].src}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400">
                                    Sin imagen
                                </div>
                            )}
                        </div>
                        <h3 className="font-serif text-lg text-stone-900 group-hover:text-amber-700 transition-colors">
                            {product.title}
                        </h3>
                        <p className="text-stone-600 text-sm mt-1 line-clamp-2">
                            {product.description}
                        </p>
                    </Link>
                    <div className="flex items-center justify-between mt-3">
                        <span className="font-semibold text-stone-900">
                            {parseFloat(product.variants[0]?.price.amount || '0').toFixed(2)}€
                        </span>
                        <button
                            onClick={() => addToCart({
                                id: product.variants[0]?.id || product.id,
                                title: product.title,
                                price: product.variants[0]?.price.amount || '0',
                                currency: product.variants[0]?.price.currencyCode || 'EUR',
                                image: product.images[0]?.src || '',
                                quantity: 1,
                            })}
                            className="px-4 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider rounded-full hover:bg-amber-700 transition-colors"
                        >
                            Añadir
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
