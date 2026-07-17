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
    fromPrice?: boolean;
}

export function ProductCard({ title, handle, price, currency, images, fromPrice = false }: ProductCardProps) {
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
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-6 group-hover:shadow-xl transition-shadow duration-500">
                    {/* Primary Image */}
                    <div
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isHovered && hasMultipleImages ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        {primaryImage ? (
                            <Image
                                src={primaryImage}
                                alt={title}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
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
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <Image
                                src={secondaryImage}
                                alt={`${title} - Vista alternativa`}
                                fill
                                className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                        </div>
                    )}

                    {/* Image indicator dots (visible on hover) */}
                    {hasMultipleImages && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            {images.slice(0, 4).map((_, index) => (
                                <span
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${(index === 0 && !isHovered) || (index === 1 && isHovered)
                                        ? 'bg-white shadow-sm'
                                        : 'bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Ver Detalles overlay (slides up on hover) */}
                    <div className="absolute bottom-0 left-0 right-0 p-0 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <button className="w-full bg-[#1A1412]/95 backdrop-blur-md text-white py-4 uppercase text-[10px] tracking-[0.2em] font-medium hover:bg-stone-900 transition-colors">
                            Ver Detalles
                        </button>
                    </div>
                </div>

                <div className="text-center px-2">
                    <h3 className="font-serif text-lg md:text-xl text-[#1A1412] mb-2 group-hover:text-stone-500 transition-colors line-clamp-2">{title}</h3>
                    <p className="text-sm font-medium text-stone-500 tracking-wider font-sans">{fromPrice ? 'Desde ' : ''}{price} {currency}</p>
                </div>
            </Link>
        </div>
    );
}
