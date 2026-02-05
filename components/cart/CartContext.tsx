'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { shopifyClient } from '@/lib/shopify';

type CartItem = {
    id: string; // Variant ID
    title: string;
    price: string;
    currency: string;
    image: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    isCartOpen: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    toggleCart: () => void;
    checkoutUrl: string | null;
    itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

    // Load cart from local storage on mount (optional for this stage but good for UX)
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, item];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // In a real implementation, we would sync with Shopify Checkout API here
    // to get a webUrl for checkout.
    // For now, we mock it.
    useEffect(() => {
        if (cart.length > 0) {
            // Mock checkout URL generation
            setCheckoutUrl('https://checkout.shopify.com');
        }
    }, [cart]);

    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, isCartOpen, addToCart, removeFromCart, toggleCart, checkoutUrl, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
