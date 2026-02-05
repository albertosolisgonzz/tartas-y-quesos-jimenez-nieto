'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const cookieConsent = localStorage.getItem('cookie-consent');
        if (!cookieConsent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem('cookie-consent', 'all');
        setIsVisible(false);
    };

    const acceptEssential = () => {
        localStorage.setItem('cookie-consent', 'essential');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-stone-200 shadow-lg">
            <div className="container mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Text */}
                    <div className="flex-1">
                        <p className="text-sm text-stone-600">
                            Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación
                            y analizar el tráfico. Puedes aceptar todas las cookies o solo las esenciales.{' '}
                            <Link href="/legal/cookies" className="text-amber-700 hover:underline">
                                Más información
                            </Link>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 shrink-0">
                        <button
                            onClick={acceptEssential}
                            className="px-4 py-2 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                        >
                            Solo esenciales
                        </button>
                        <button
                            onClick={acceptAll}
                            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
                        >
                            Aceptar todas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
