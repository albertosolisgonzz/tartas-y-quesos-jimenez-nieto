'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts, NormalizedProduct } from '@/lib/shopify';

interface SearchDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<NormalizedProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<NormalizedProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch products once on mount (or when first opened to save initial load)
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                // In a real app we might want to fetch this server side or via API route
                // but for this size, client side fetch is fine
                const allProducts = await getAllProducts();
                setProducts(allProducts);
                // Initially show all or some featured products
                setFilteredProducts(allProducts.slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch products for search', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpen && products.length === 0) {
            fetchProducts();
        }
    }, [isOpen, products.length]);

    // Handle search filtering
    useEffect(() => {
        if (!query.trim()) {
            // Show suggestions/featured when empty
            setFilteredProducts(products.slice(0, 4));
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(lowerQuery) ||
            product.productType.toLowerCase().includes(lowerQuery)
        );
        setFilteredProducts(filtered);
    }, [query, products]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery(''); // Reset query on close? Optional.
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl animate-fade-in max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header / Search Input */}
                <div className="container mx-auto px-4 md:px-8 py-6 border-b border-stone-100 flex items-center gap-4">
                    <SearchIcon className="w-6 h-6 text-stone-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Buscar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 text-2xl md:text-3xl font-light text-stone-800 placeholder-stone-300 focus:outline-none bg-transparent"
                    />
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                        aria-label="Cerrar búsqueda"
                    >
                        <X className="w-6 h-6 text-stone-500" />
                    </button>
                </div>

                {/* Results Area */}
                <div className="container mx-auto px-4 md:px-8 py-8 overflow-y-auto max-h-[calc(80vh-100px)]">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                            {query ? 'Productos' : 'Visto recientemente'}
                        </h3>
                        {/* {query && filteredProducts.length > 0 && (
                            <span className="text-xs text-stone-400">{filteredProducts.length} resultados</span>
                        )} */}
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin"></div>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <Link
                                    href={`/product/${product.handle}`}
                                    key={product.id}
                                    onClick={onClose}
                                    className="group flex flex-col gap-3"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-stone-100 rounded-sm">
                                        {product.images?.[0] ? (
                                            <Image
                                                src={product.images[0].src}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-stone-800 group-hover:text-amber-700 transition-colors line-clamp-2">
                                            {product.title}
                                        </h4>
                                        <p className="text-stone-500 text-sm mt-1">
                                            {product.variants?.[0]?.price?.amount} {product.variants?.[0]?.price?.currencyCode === 'EUR' ? '€' : product.variants?.[0]?.price?.currencyCode}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-stone-400">
                            No se encontraron productos que coincidan con &quot;{query}&quot;
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
