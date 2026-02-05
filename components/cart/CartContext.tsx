'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { shopifyClient } from '@/lib/shopify';

type CartItem = {
    id: string; // Variant ID (must be Shopify GID format)
    title: string;
    price: string;
    currency: string;
    image: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    isCartOpen: boolean;
    isLoading: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    toggleCart: () => void;
    proceedToCheckout: () => Promise<void>;
    checkoutUrl: string | null;
    itemCount: number;
    cartTotal: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [checkoutId, setCheckoutId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch {
                localStorage.removeItem('cart');
            }
        }
    }, []);

    // Save cart to local storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prev, item];
        });
        setIsCartOpen(true);
        // Reset checkout when cart changes
        setCheckoutUrl(null);
        setCheckoutId(null);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
        setCheckoutUrl(null);
        setCheckoutId(null);
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
        setCheckoutUrl(null);
        setCheckoutId(null);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // Create Shopify checkout and get checkout URL
    const proceedToCheckout = useCallback(async () => {
        if (cart.length === 0) return;

        setIsLoading(true);

        try {
            if (shopifyClient) {
                // Create line items for Shopify checkout
                const lineItems = cart.map((item) => ({
                    variantId: item.id,
                    quantity: item.quantity,
                }));

                // Create a new checkout
                const checkout = await shopifyClient.checkout.create({
                    lineItems,
                });

                // Get the checkout URL
                const webUrl = checkout.webUrl;
                setCheckoutUrl(webUrl);
                setCheckoutId(checkout.id as string);

                // Redirect to Shopify checkout
                window.location.href = webUrl;
            } else {
                // Fallback for development without Shopify credentials
                console.warn('Shopify client not configured. Using mock checkout.');
                alert('Modo desarrollo: El checkout real requiere credenciales de Shopify configuradas.');
            }
        } catch (error) {
            console.error('Error creating checkout:', error);
            alert('Error al crear el checkout. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }, [cart]);

    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const cartTotal = cart.reduce((acc, item) => {
        return acc + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            isLoading,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart,
            proceedToCheckout,
            checkoutUrl,
            itemCount,
            cartTotal
        }}>
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
