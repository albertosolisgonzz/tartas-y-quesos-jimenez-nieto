'use client';

import { useCart } from './CartContext';
import { X, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export function CartDrawer() {
    const {
        isCartOpen,
        toggleCart,
        cart,
        removeFromCart,
        updateQuantity,
        proceedToCheckout,
        isLoading,
        itemCount,
        cartTotal
    } = useCart();

    const handleCheckout = async () => {
        await proceedToCheckout();
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                            <h2 className="font-serif text-xl font-bold">Tu Cesta ({itemCount})</h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-stone-500" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                                    <ShoppingBag className="w-12 h-12 opacity-20" />
                                    <p>Tu cesta está vacía</p>
                                    <button onClick={toggleCart} className="text-stone-900 border-b border-stone-900 pb-1 text-sm uppercase tracking-widest font-bold">
                                        Seguir Comprando
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative w-20 h-24 bg-stone-100 shrink-0">
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-serif text-stone-900">{item.title}</h3>
                                                    <span className="font-light text-stone-600">{item.price} {item.currency}</span>
                                                </div>
                                                <p className="text-xs text-stone-500 mb-4">Cantidad: {item.quantity}</p>
                                                <div className="flex items-center justify-between">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center border border-stone-200">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 hover:bg-stone-50"
                                                        >
                                                            <Minus className="w-3 h-3 text-stone-400" />
                                                        </button>
                                                        <span className="px-2 text-xs text-stone-600">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 hover:bg-stone-50"
                                                        >
                                                            <Plus className="w-3 h-3 text-stone-400" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-xs text-red-400 hover:text-red-600 underline"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-stone-100 bg-stone-50">
                                <div className="flex justify-between mb-4 text-stone-900 font-bold">
                                    <span>Total Estimado</span>
                                    <span>{cartTotal} EUR</span>
                                </div>
                                <p className="text-xs text-stone-500 mb-6 text-center">
                                    Impuestos y envío calculados al finalizar la compra.
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className="block w-full bg-stone-900 text-white text-center py-4 uppercase tracking-widest text-xs font-bold hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Procesando...
                                        </span>
                                    ) : (
                                        'Proceder al Pago'
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
