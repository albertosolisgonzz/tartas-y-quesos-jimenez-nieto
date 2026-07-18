'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { PortionIcon, TubIcon } from '../shop/PortionIcon';
import { PromoBanner } from './PromoBanner';

const STORAGE_KEY = 'promo-island-seen';

type Phase = 'none' | 'island' | 'banner';

/**
 * Sistema de promociones en dos tiempos: al entrar (una vez por sesión)
 * aparece una isla centrada con las promos; al cerrarla, queda el banner
 * fijo sobre el navbar. La clase `promo-banner-visible` en <html> ajusta
 * el desplazamiento del contenido según haya banner o no.
 */
export function PromoSystem() {
    const [phase, setPhase] = useState<Phase>('none');

    useEffect(() => {
        if (sessionStorage.getItem(STORAGE_KEY)) {
            setPhase('banner');
            return;
        }
        const timer = setTimeout(() => setPhase('island'), 700);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('promo-banner-visible', phase === 'banner');
        document.body.style.overflow = phase === 'island' ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [phase]);

    useEffect(() => {
        if (phase !== 'island') return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeIsland();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase]);

    const closeIsland = () => {
        sessionStorage.setItem(STORAGE_KEY, '1');
        setPhase('banner');
    };

    return (
        <>
            {phase === 'banner' && <PromoBanner />}

            {phase === 'island' && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Promociones activas"
                >
                    {/* Fondo */}
                    <div
                        className="absolute inset-0 bg-black/55 backdrop-blur-[2px] animate-fade-in"
                        onClick={closeIsland}
                    />

                    {/* Isla */}
                    <div className="relative w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl animate-scale-in bg-white">
                        {/* Cabecera */}
                        <div className="bg-stone-900 text-center px-6 pt-7 pb-6 relative">
                            <button
                                onClick={closeIsland}
                                className="absolute right-3 top-3 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Cerrar promociones"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <p className="text-amber-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                                Promociones
                            </p>
                            <h2 className="font-serif text-3xl text-white leading-tight">
                                Packs a 9 €
                            </h2>
                            <p className="text-stone-400 text-xs mt-2 font-light">
                                Elige tus sabores favoritos y combínalos a tu gusto
                            </p>
                        </div>

                        {/* Promos */}
                        <div className="p-5 flex flex-col gap-3">
                            <Link
                                href="/product/pack-3-porciones-de-tarta"
                                onClick={closeIsland}
                                className="group flex items-center gap-4 border border-stone-200 rounded-xl p-4 hover:border-amber-700/40 hover:bg-stone-50 transition-colors"
                            >
                                <span className="w-12 h-12 shrink-0 rounded-full bg-amber-50 flex items-center justify-center">
                                    <PortionIcon fraction={1 / 8} className="w-7 h-7 text-amber-800" />
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="block text-[15px] font-medium text-stone-900 leading-snug">
                                        3 porciones de tarta a elegir
                                    </span>
                                    <span className="block text-xs text-stone-500 mt-0.5 leading-snug">
                                        Clásica, Lotus, pistacho, Oreo, dulce de leche o Kinder
                                    </span>
                                </span>
                                <span className="font-serif text-2xl text-stone-900 group-hover:text-amber-800 transition-colors">
                                    9 €
                                </span>
                            </Link>

                            <Link
                                href="/product/pack-3-tarrinas-de-crema-100-gr"
                                onClick={closeIsland}
                                className="group flex items-center gap-4 border border-stone-200 rounded-xl p-4 hover:border-amber-700/40 hover:bg-stone-50 transition-colors"
                            >
                                <span className="w-12 h-12 shrink-0 rounded-full bg-amber-50 flex items-center justify-center">
                                    <TubIcon size="sm" className="w-7 h-7 text-amber-800" />
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="block text-[15px] font-medium text-stone-900 leading-snug">
                                        3 cremas de queso a elegir
                                    </span>
                                    <span className="block text-xs text-stone-500 mt-0.5 leading-snug">
                                        De oveja o de cabra, en tarrinas de 100 g
                                    </span>
                                </span>
                                <span className="font-serif text-2xl text-stone-900 group-hover:text-amber-800 transition-colors">
                                    9 €
                                </span>
                            </Link>

                            <button
                                onClick={closeIsland}
                                className="mt-1 text-xs text-stone-400 hover:text-stone-600 transition-colors py-1.5 uppercase tracking-[0.15em]"
                            >
                                Seguir navegando
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
