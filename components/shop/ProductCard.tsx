'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
    id: string;
    title: string;
    handle: string;
    price: string;
    currency: string;
    images: { src: string }[];
}

export function ProductCard({ title, handle, price, currency, images }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const primaryImage = images?.[0]?.src || '';
    const secondaryImage = images?.[1]?.src || primaryImage;
    const hasMultipleImages = images && images.length > 1;

    return (
        <div
            className="group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${handle}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                    {/* Primary Image */}
                    <div
                        className={`absolute inset-0 transition-opacity duration-500 ease-out ${isHovered && hasMultipleImages ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        {primaryImage ? (
                            <Image
                                src={primaryImage}
                                alt={title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400">
                                <span>No Image</span>
                            </div>
                        )}
                    </div>

                    {/* Secondary Image (shown on hover) */}
                    {hasMultipleImages && (
                        <div
                            className={`absolute inset-0 transition-opacity duration-500 ease-out ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <Image
                                src={secondaryImage}
                                alt={`${title} - Vista alternativa`}
                                fill
                                className="object-cover scale-105"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                        </div>
                    )}

                    {/* Image indicator dots */}
                    {hasMultipleImages && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                            {images.slice(0, 4).map((_, index) => (
                                <span
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${(index === 0 && !isHovered) || (index === 1 && isHovered)
                                            ? 'bg-white scale-110'
                                            : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Quick Add Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-full bg-white/90 backdrop-blur text-stone-900 py-3 uppercase text-xs tracking-widest font-bold hover:bg-stone-900 hover:text-white transition-colors">
                            Ver Detalles
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="font-serif text-lg text-stone-900 mb-1 group-hover:text-stone-600 transition-colors">{title}</h3>
                    <p className="text-sm text-stone-500 tracking-wide">{price} {currency}</p>
                </div>
            </Link>
        </div>
    );
}
