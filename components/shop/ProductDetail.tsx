'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../cart/CartContext';
import { Minus, Plus, ShoppingBag } from 'lucide-react';

interface ProductDetailProps {
    product: any;
}

// Helper function to parse product description into sections
function parseDescription(text: string) {
    const fichaKeywords = [
        'Formato:',
        'Elaboración:',
        'Leche:',
        'Origen:',
        'Conservación:',
        'Productor:',
        'Acompañamientos Recomendados'
    ];

    // Find where "Ficha del Producto" starts
    const fichaIndex = text.indexOf('Ficha del Producto');

    if (fichaIndex === -1) {
        return { description: text, fichaItems: [] };
    }

    const description = text.substring(0, fichaIndex).trim();
    let fichaText = text.substring(fichaIndex);

    // Parse ficha items
    const fichaItems: { label: string; value: string }[] = [];

    fichaKeywords.forEach((keyword, i) => {
        const keyIndex = fichaText.indexOf(keyword);
        if (keyIndex !== -1) {
            // Find where this item ends (next keyword or end of string)
            let endIndex = fichaText.length;
            for (let j = i + 1; j < fichaKeywords.length; j++) {
                const nextIndex = fichaText.indexOf(fichaKeywords[j]);
                if (nextIndex !== -1 && nextIndex > keyIndex) {
                    endIndex = nextIndex;
                    break;
                }
            }
            const value = fichaText.substring(keyIndex + keyword.length, endIndex).trim();
            if (value) {
                fichaItems.push({ label: keyword.replace(':', ''), value });
            }
        }
    });

    return { description, fichaItems };
}

export function ProductDetail({ product }: ProductDetailProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const variant = product.variants[0];
    const { description, fichaItems } = parseDescription(product.description || '');
    const images = product.images || [];

    const handleAddToCart = () => {
        addToCart({
            id: variant.id || product.id,
            title: product.title,
            price: variant.price.amount,
            currency: variant.price.currencyCode,
            image: product.images[0]?.src,
            quantity: quantity
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div className="flex flex-col gap-3">
                {/* Main Image */}
                <div className="bg-stone-50 aspect-square relative overflow-hidden rounded-sm">
                    {images[selectedImageIndex] && (
                        <Image
                            src={images[selectedImageIndex].src}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {images.map((image: { src: string }, index: number) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                        ? 'border-stone-900'
                                        : 'border-transparent hover:border-stone-300'
                                    }`}
                            >
                                <Image
                                    src={image.src}
                                    alt={`${product.title} - ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.25em] text-stone-400 uppercase mb-2">Jimenez Nieto</span>
                <h1 className="font-serif text-2xl md:text-3xl text-stone-900 mb-3">{product.title}</h1>
                <p className="text-xl text-stone-800 mb-5 font-medium">
                    {variant.price.amount} {variant.price.currencyCode === 'EUR' ? '€' : variant.price.currencyCode}
                </p>

                {/* Description - more compact */}
                {description && (
                    <p className="text-sm text-stone-600 font-light leading-relaxed mb-5 line-clamp-4">
                        {description}
                    </p>
                )}

                {/* Ficha Técnica - Clean table-like layout */}
                {fichaItems.length > 0 && (
                    <div className="bg-stone-50 rounded-sm p-4 mb-5">
                        <h3 className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-3">Ficha del Producto</h3>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            {fichaItems.map((item, index) => (
                                <div key={index} className="contents">
                                    <dt className="text-stone-500 font-medium">{item.label}</dt>
                                    <dd className="text-stone-700">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}

                {/* Actions - more compact */}
                <div className="flex gap-3 mb-5">
                    <div className="flex items-center border border-stone-200 w-28 justify-between px-3 rounded-sm">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="py-3 text-stone-400 hover:text-stone-900 transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="text-stone-900 font-medium text-sm">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="py-3 text-stone-400 hover:text-stone-900 transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-stone-900 text-white uppercase tracking-widest text-[10px] font-bold py-3 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 rounded-sm"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Añadir a la Cesta
                    </button>
                </div>

                {/* Shipping info */}
                <div className="border-t border-stone-100 pt-4 space-y-1.5">
                    <div className="flex justify-between text-xs text-stone-400">
                        <span>Envío</span>
                        <span className="text-stone-600">Calculado al finalizar</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-400">
                        <span>Entrega estimada</span>
                        <span className="text-stone-600">2-4 días laborables</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
