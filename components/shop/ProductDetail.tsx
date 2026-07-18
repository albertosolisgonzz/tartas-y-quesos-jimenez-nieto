'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../cart/CartContext';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { PortionIcon, TubIcon, formatIllustration } from './PortionIcon';
import type { NormalizedProduct } from '@/lib/shopify';

interface ProductDetailProps {
    product: NormalizedProduct;
    bundleOptions?: BundleOption[];
}

export type BundleOption = {
    id: string;
    title: string;
    image: { src: string };
};

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
    const fichaText = text.substring(fichaIndex);

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

export function ProductDetail({ product, bundleOptions = [] }: ProductDetailProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [selectedBundleIds, setSelectedBundleIds] = useState<(string | null)[]>([null, null, null]);
    const [activePortion, setActivePortion] = useState(0);

    const variants = product.variants || [];
    // Con una sola variante «Default Title» no hay nada que elegir
    const hasVariantChoice = variants.length > 1;
    const variant = variants[selectedVariantIndex] || variants[0];
    const { description, fichaItems } = parseDescription(product.description || '');
    const images = product.images || [];
    const isBundleProduct = bundleOptions.length > 0;
    const selectedBundle = selectedBundleIds.map((id) =>
        bundleOptions.find((option) => option.id === id) ?? null,
    );
    const isBundleComplete = !isBundleProduct || selectedBundle.every(Boolean);

    const handleBundleSelection = (optionId: string) => {
        const nextSelection = [...selectedBundleIds];
        nextSelection[activePortion] = optionId;
        setSelectedBundleIds(nextSelection);

        const nextEmptyPortion = nextSelection.findIndex(
            (selection, index) => index > activePortion && selection === null,
        );
        if (nextEmptyPortion !== -1) {
            setActivePortion(nextEmptyPortion);
        }
    };

    const handleAddToCart = () => {
        if (!variant || !isBundleComplete) return;

        const customAttributes = isBundleProduct
            ? selectedBundle.map((option, index) => ({
                key: `Porción ${index + 1}`,
                value: option?.title ?? '',
            }))
            : undefined;
        const selectionSignature = selectedBundleIds.filter(Boolean).join('|');

        addToCart({
            id: isBundleProduct ? `${variant.id}::${selectionSignature}` : variant.id || product.id,
            variantId: variant.id || product.id,
            title: hasVariantChoice
                ? `${product.title} — ${variant.title}`
                : product.title,
            price: variant.price.amount,
            currency: variant.price.currencyCode,
            image: product.images[0]?.src ?? selectedBundle[0]?.image.src ?? bundleOptions[0]?.image.src ?? '',
            quantity,
            customAttributes,
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div className="flex flex-col gap-3">
                {/* Main Image */}
                <div className="bg-stone-50 aspect-square relative overflow-hidden rounded-sm">
                    {images[selectedImageIndex] ? (
                        <Image
                            src={images[selectedImageIndex].src}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : isBundleProduct ? (
                        <div
                            className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-px bg-white"
                            role="img"
                            aria-label="Los seis sabores de tarta disponibles para el pack"
                        >
                            {bundleOptions.slice(0, 6).map((option, index) => (
                                <div key={option.id} className="relative overflow-hidden bg-stone-100">
                                    <Image
                                        src={option.image.src}
                                        alt=""
                                        fill
                                        priority={index < 3}
                                        className="object-cover"
                                        sizes="(max-width: 768px) 33vw, 17vw"
                                    />
                                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-2 pt-7 text-center text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white">
                                        {option.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-stone-400">
                            Imagen no disponible
                        </div>
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

                {/* Variant selector (tamaños / formatos) */}
                {hasVariantChoice && (
                    <div className="mb-5">
                        <h3 className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2.5">
                            Elige el formato
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {variants.map((v: { id: string; title: string; price: { amount: string } }, index: number) => {
                                const isSelected = selectedVariantIndex === index;
                                const illustration = formatIllustration(product.title || '', v.title);
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVariantIndex(index)}
                                        aria-pressed={isSelected}
                                        className={`px-3.5 py-2.5 rounded-sm border text-left transition-all duration-200 flex items-center gap-2.5 ${isSelected
                                            ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                                            }`}
                                    >
                                        {illustration !== null && (
                                            illustration.kind === 'portion' ? (
                                                <PortionIcon
                                                    fraction={illustration.fraction}
                                                    className={`w-6 h-6 shrink-0 transition-colors duration-200 ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}
                                                />
                                            ) : (
                                                <TubIcon
                                                    size={illustration.size}
                                                    className={`w-6 h-6 shrink-0 transition-colors duration-200 ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}
                                                />
                                            )
                                        )}
                                        <span className="block">
                                            <span className="block text-[11px] uppercase tracking-[0.08em] font-medium whitespace-nowrap">
                                                {v.title}
                                            </span>
                                            <span className={`block text-xs mt-0.5 ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                                                {v.price.amount} €
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {isBundleProduct && (
                    <section className="mb-6 border-y border-stone-200 py-5" aria-labelledby="bundle-selector-title">
                        <div className="mb-4 flex items-end justify-between gap-4">
                            <div>
                                <p className="mb-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-amber-700">
                                    Pack personalizado
                                </p>
                                <h2 id="bundle-selector-title" className="font-serif text-xl text-stone-900">
                                    Elige tus 3 porciones
                                </h2>
                            </div>
                            <span className="text-xs text-stone-500">
                                {selectedBundle.filter(Boolean).length} de 3
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2" aria-label="Porciones del pack">
                            {selectedBundle.map((option, index) => {
                                const isActive = activePortion === index;
                                return (
                                    <button
                                        key={`portion-${index + 1}`}
                                        type="button"
                                        onClick={() => setActivePortion(index)}
                                        aria-pressed={isActive}
                                        className={`min-w-0 overflow-hidden rounded-sm border text-left transition-colors ${isActive
                                            ? 'border-stone-900 ring-1 ring-stone-900'
                                            : 'border-stone-200 hover:border-stone-400'
                                            }`}
                                    >
                                        <span className="relative block aspect-[4/3] bg-stone-100">
                                            {option ? (
                                                <Image
                                                    src={option.image.src}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 33vw, 12vw"
                                                />
                                            ) : (
                                                <span className="absolute inset-0 flex items-center justify-center font-serif text-3xl italic text-stone-300">
                                                    {index + 1}
                                                </span>
                                            )}
                                        </span>
                                        <span className="block truncate px-2 py-2 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-stone-700">
                                            {option?.title ?? `Porción ${index + 1}`}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <p className="mb-3 mt-5 text-xs font-medium text-stone-700" aria-live="polite">
                            Selecciona el sabor de la porción {activePortion + 1}
                        </p>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="group" aria-label={`Sabores para la porción ${activePortion + 1}`}>
                            {bundleOptions.map((option) => {
                                const isSelected = selectedBundleIds[activePortion] === option.id;
                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => handleBundleSelection(option.id)}
                                        aria-pressed={isSelected}
                                        className={`group relative overflow-hidden rounded-sm border bg-white text-left transition-all ${isSelected
                                            ? 'border-stone-900 ring-1 ring-stone-900'
                                            : 'border-stone-200 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-sm'
                                            }`}
                                    >
                                        <span className="relative block aspect-[4/3] overflow-hidden bg-stone-100">
                                            <Image
                                                src={option.image.src}
                                                alt=""
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                sizes="(max-width: 640px) 50vw, 12vw"
                                            />
                                            {isSelected && (
                                                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-white">
                                                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </span>
                                        <span className="block px-2.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-stone-700">
                                            {option.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {!isBundleComplete && (
                            <p className="mt-3 text-xs text-stone-500">
                                Completa las tres porciones para añadir el pack a la cesta.
                            </p>
                        )}
                    </section>
                )}

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
                        disabled={!isBundleComplete}
                        className="flex-1 bg-stone-900 text-white uppercase tracking-widest text-[10px] font-bold py-3 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 rounded-sm disabled:cursor-not-allowed disabled:bg-stone-300"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {isBundleProduct && !isBundleComplete ? 'Elige las 3 porciones' : 'Añadir a la Cesta'}
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
