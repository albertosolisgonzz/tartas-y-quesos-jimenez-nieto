'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../cart/CartContext';
import { SearchDrawer } from '../search/SearchDrawer';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    const { toggleCart, itemCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md border-b border-stone-100' : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20 md:h-24">
                    {/* Mobile Menu & Search */}
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`p-2 rounded-full transition-colors md:hidden ${isScrolled || !isHome ? 'hover:bg-stone-100 text-stone-800' : 'hover:bg-white/10 text-white'
                                }`}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`p-2 rounded-full transition-colors hidden md:block ${isScrolled || !isHome ? 'hover:bg-stone-100 text-stone-800' : 'hover:bg-white/10 text-white'
                                }`}
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-1 flex justify-center relative h-full py-1">
                        <Link href="/" className="relative h-full w-auto aspect-[2/1] flex items-center justify-center">
                            <Image
                                src="/images/logo-jimenez-nieto.png"
                                alt="Jimenez Nieto - Tartas y Quesos"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 160px, 200px"
                                priority
                            />
                        </Link>
                    </div>






                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 flex-1">
                        <Link
                            href="/account"
                            className={`p-2 rounded-full transition-colors hidden md:block ${isScrolled || !isHome ? 'hover:bg-stone-100 text-stone-800' : 'hover:bg-white/10 text-white'
                                }`}
                        >
                            <User className="w-5 h-5" />
                        </Link>
                        <button
                            onClick={toggleCart}
                            className={`p-2 rounded-full transition-colors relative ${isScrolled || !isHome ? 'hover:bg-stone-100 text-stone-800' : 'hover:bg-white/10 text-white'
                                }`}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white text-[0.6rem] flex items-center justify-center rounded-full animate-scale-in">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>
            <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                onOpenSearch={() => setIsSearchOpen(true)}
            />
        </>
    );
}
