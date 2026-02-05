'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
    {
        id: 1,
        author: 'Cliente Google',
        rating: 5,
        text: 'Deliciosos quesos artesanos!!! Muy buena atención, 100% recomendable. Se nota la calidad de la leche de sus propias cabras.',
        date: 'Hace 2 meses',
        initial: 'C'
    },
    {
        id: 2,
        author: 'Sensaciones Gourmet',
        rating: 5,
        text: 'Muy buena relación calidad-precio. El producto está a un nivel mucho más alto de lo que cuesta. Deliciosos y muy bien presentados.',
        date: 'Hace 1 mes',
        initial: 'S'
    },
    {
        id: 3,
        author: 'Elena Rodríguez',
        rating: 5,
        text: 'Probé su crema de queso con miel y es un espectáculo. Un sabor suave y textura perfecta. Se han convertido en un imprescindible en mi mesa.',
        date: 'Hace 3 semanas',
        initial: 'E'
    }
];


export function TestimonialsSection() {
    return (
        <section className="py-16 bg-stone-50 border-y border-stone-100">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header with Google Badge */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-200 mb-6">
                        <div className="relative w-6 h-6">
                            {/* Google G Logo Mock */}
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24-2.19-1.6z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </div>
                        <span className="font-medium text-xs text-stone-600">4.9/5 en Google Reviews</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                        Lo que dicen de nosotros
                    </h2>
                    <p className="text-stone-500 text-sm max-w-lg mx-auto">
                        La satisfacción de nuestros clientes es nuestro mejor aval.
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-serif font-bold">
                                    {review.initial}
                                </div>
                                <div>
                                    <h4 className="font-medium text-stone-900 text-sm">{review.author}</h4>
                                    <p className="text-xs text-stone-400">{review.date}</p>
                                </div>
                                <div className="ml-auto">
                                    <div className="flex text-amber-400">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-stone-600 text-sm leading-relaxed italic">
                                "{review.text}"
                            </p>
                            <div className="mt-4 pt-4 border-t border-stone-50 flex items-center gap-1">
                                <div className="w-4 h-4 relative opacity-60">
                                    {/* Small Google Icon */}
                                    <svg viewBox="0 0 24 24" className="w-full h-full">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24-2.19-1.6z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </div>
                                <span className="text-[10px] text-stone-400 font-medium">Publicado en Google</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
