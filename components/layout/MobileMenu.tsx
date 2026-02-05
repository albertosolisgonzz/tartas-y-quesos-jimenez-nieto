'use client';

import Link from 'next/link';
import { X, Search, Instagram, Facebook } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenSearch: () => void;
}

const MENU_ITEMS = [
    { label: 'Inicio', href: '/' },
    { label: 'Tartas', href: '/collections/tartas' },
    { label: 'Cremas', href: '/collections/cremas' },
    { label: 'Quesos', href: '/collections/quesos' },
    { label: 'Contacto', href: '/contact' },
];

export function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] md:hidden">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div
                className={`absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-stone-50 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 flex items-center justify-between border-b border-stone-100">
                        <span className="text-lg font-serif italic text-stone-800">Menú</span>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-stone-500" />
                        </button>
                    </div>

                    {/* Search Button (Mobile) */}
                    <div className="p-6 pb-2">
                        <button
                            onClick={() => {
                                onClose();
                                setTimeout(onOpenSearch, 100); // Small delay to allow menu to close smoothly
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-stone-200 rounded-lg text-stone-500 hover:border-stone-400 transition-colors"
                        >
                            <Search className="w-5 h-5" />
                            <span className="font-light">Buscar productos...</span>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto px-6 py-4">
                        <ul className="space-y-4">
                            {MENU_ITEMS.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className={`block text-2xl font-light transition-colors ${isActive ? 'text-stone-900 font-medium' : 'text-stone-600 hover:text-stone-900'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Footer / Socials */}
                    <div className="p-6 border-t border-stone-100 bg-white">
                        <div className="flex items-center gap-6 justify-center mb-6">
                            <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                        </div>
                        <p className="text-xs text-center text-stone-400 font-light">
                            © 2024 Jiménez Nieto
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
