'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';

const GRADIENTS = [
    "bg-gradient-to-br from-[#667eea] to-[#764ba2]",
    "bg-gradient-to-br from-[#ff9a9e] via-[#fecfef] to-[#fecfef]",
    "bg-gradient-to-br from-[#84fab0] to-[#8fd3f4]",
    "bg-gradient-to-br from-[#f6d365] to-[#fda085]",
    "bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb]",
];

const testimonials = [
    {
        id: '1',
        name: "Cliente Google",
        initial: "C",
        date: "Hace 2 meses",
        text: "Deliciosos quesos artesanos!!! Muy buena atención, 100% recomendable. Se nota la calidad de la leche de sus propias cabras.",
        rating: 5,
        bgClass: GRADIENTS[0]
    },
    {
        id: '2',
        name: "Sensaciones Gourmet",
        initial: "S",
        date: "Hace 1 mes",
        text: "Muy buena relación calidad-precio. El producto está a un nivel mucho más alto de lo que cuesta. Deliciosos y muy bien presentados.",
        rating: 5,
        bgClass: GRADIENTS[1]
    },
    {
        id: '3',
        name: "Elena Rodríguez",
        initial: "E",
        date: "Hace 3 semanas",
        text: "Probé su crema de queso con miel y es un espectáculo. Un sabor suave y textura perfecta. Se han convertido en un imprescindible en mi mesa.",
        rating: 5,
        bgClass: GRADIENTS[3]
    },
    {
        id: '4',
        name: "Carlos Jiménez",
        initial: "C",
        date: "Hace 2 semanas",
        text: "La tarta de queso es espectacular. Envío rápido y refrigerado. Repetiré seguro.",
        rating: 5,
        bgClass: GRADIENTS[2]
    },
    {
        id: '5',
        name: "Laura Martín",
        initial: "L",
        date: "Hace 1 mes",
        text: "Me encanta que sea un producto local de Porzuna. El sabor es auténtico, nada que ver con los del supermercado.",
        rating: 5,
        bgClass: GRADIENTS[4]
    },
    {
        id: '6',
        name: "Antonio García",
        initial: "A",
        date: "Hace 1 mes",
        text: "Profesionales de verdad. El queso curado en aceite es una maravilla.",
        rating: 5,
        bgClass: GRADIENTS[0]
    }
];

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24-2.19-1.6z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export function TestimonialsSection() {
    const average = 4.9;
    const total = 107; // Simulated total

    return (
        <section className="py-20 bg-stone-50 border-y border-stone-100 relative overflow-hidden">
            {/* Header Section mimicking the example */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100 mb-6 text-sm font-semibold text-stone-500">
                        <GoogleIcon className="w-4 h-4" />
                        <span>Excelencia Verificada</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 mb-6">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-lg text-stone-500 max-w-2xl mx-auto mb-8">
                        Artesanía, sabor y servicio. Así definen su experiencia comprando en Jiménez Nieto.
                    </p>

                    {/* Score Block */}
                    <div className="inline-flex items-center gap-6 bg-white p-6 pr-10 rounded-3xl shadow-sm border border-stone-100">
                        <div className="text-6xl font-black text-stone-900 leading-none">
                            {average}
                        </div>
                        <div className="text-left flex flex-col">
                            <div className="flex text-amber-400 text-xl tracking-[0.2em] mb-1">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                            <div className="text-xs font-medium text-stone-400 uppercase tracking-wide">
                                Basado en {total} reseñas de Google
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
                    {testimonials.map((review) => (
                        <div
                            key={review.id}
                            className="relative flex flex-col justify-between h-full p-8 bg-white rounded-2xl border border-white/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-stone-200 group"
                        >
                            <div className="absolute top-6 right-6 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0">
                                <GoogleIcon className="w-6 h-6" />
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-lg font-bold shadow-sm ${review.bgClass}`}>
                                        {review.initial}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-base text-stone-900 leading-tight">
                                            {review.name}
                                        </span>
                                        <span className="text-xs text-stone-400 mt-0.5">
                                            {review.date}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex text-amber-400 text-sm tracking-widest mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>

                                <p className="text-[15px] text-stone-600 leading-relaxed font-normal">
                                    "{review.text}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <Link
                        href="https://www.google.com/search?q=Quesos+Jimenez+Nieto+Porzuna"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-white text-stone-900 font-semibold rounded-full border border-stone-200 shadow-sm hover:bg-stone-50 hover:border-stone-300 hover:shadow-md transition-all duration-200"
                    >
                        Ver todas las reseñas en Google Maps
                    </Link>
                </div>
            </div>
        </section>
    );
}
