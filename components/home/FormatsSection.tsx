'use client';

import { Utensils, Calendar, Users, Briefcase } from 'lucide-react';

const formats = [
    {
        weight: '70g',
        title: 'EVENTOS',
        subtitle: 'El bocado perfecto',
        frontDescription: 'Ideal para cátering, degustaciones y celebraciones.',
        backDescription: 'Solución elegante para eventos sociales. Ofrece variedad sin desperdicio, garantizando una presentación impecable en cada servicio.',
        features: ['Presentación Higiénica', 'Coste Controlado', 'Sin Mermas'],
        icon: Utensils,
        color: 'bg-stone-800',
        accent: 'text-stone-100',
        borderColor: 'border-stone-700'
    },
    {
        weight: '100g',
        title: 'DIARIO',
        subtitle: 'Tu momento gourmet',
        frontDescription: 'La dosis justa de placer diario.',
        backDescription: 'Diseñado para consumo individual. Mantiene las propiedades organolépticas intactas desde la primera cucharada.',
        features: ['Frescura Garantizada', 'Formato Práctico', 'Top Ventas'],
        icon: Calendar,
        color: 'bg-stone-900',
        accent: 'text-stone-100',
        borderColor: 'border-stone-800'
    },
    {
        weight: '300g',
        title: 'FAMILIAR',
        subtitle: 'Para compartir',
        frontDescription: 'Perfecto para consumo doméstico.',
        backDescription: 'El rey de las mesas. Ideal para desayunos o cenas ligeras. Versátil para recetas caseras y repostería.',
        features: ['Ahorro Familiar', 'Uso en Cocina', 'Versatilidad'],
        icon: Users,
        color: 'bg-neutral-900',
        accent: 'text-neutral-100',
        borderColor: 'border-neutral-800'
    },
    {
        weight: '1-2kg',
        title: 'PROFESIONAL',
        subtitle: 'Alto rendimiento',
        frontDescription: 'Pensado para chefs y cátering.',
        backDescription: 'Formato industrial para cocina exigente. Optimiza el flujo de trabajo y maximiza la rentabilidad por plato.',
        features: ['Alta Rentabilidad', 'Formato Cubo', 'Vida Útil Larga'],
        icon: Briefcase,
        color: 'bg-zinc-950',
        accent: 'text-zinc-100',
        borderColor: 'border-zinc-800'
    }
];

export function FormatsSection() {
    return (
        <section className="py-24 bg-stone-900 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header Section */}
                <div className="text-center mb-20 relative">
                    <span className="text-stone-500 text-[9px] font-bold tracking-[0.3em] uppercase mb-4 block animate-fade-in">
                        Adaptabilidad Coleccionista
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-5xl text-white mb-6 font-medium">
                        Formatos para Cada Cliente
                    </h2>
                    <p className="text-stone-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed font-light tracking-wide italic">
                        "Desde el capricho individual hasta las grandes exigencias de la alta cocina."
                    </p>
                </div>

                {/* 3D Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto perspective-1000">
                    {formats.map((format, index) => {
                        const Icon = format.icon;

                        return (
                            <div
                                key={index}
                                className="group h-[360px] w-full perspective-2000 cursor-pointer"
                            >
                                <div className="relative w-full h-full transition-all duration-1000 transform-style-3d group-hover:rotate-y-180 shadow-2xl rounded-sm">

                                    {/* --- FRONT SIDE --- */}
                                    <div className={`absolute inset-0 backface-hidden rounded-sm p-8 flex flex-col justify-between overflow-hidden ${format.color} border ${format.borderColor} transition-colors duration-500`}>

                                        {/* Luxury Accent Line */}
                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                        {/* Top Content */}
                                        <div className="relative z-10 flex flex-col items-center text-center pt-2">
                                            <div className="mb-8 opacity-40 group-hover:opacity-60 transition-opacity">
                                                <Icon className={`w-6 h-6 ${format.accent}`} strokeWidth={1} />
                                            </div>

                                            <span className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-4 opacity-50 ${format.accent}`}>
                                                {format.weight}
                                            </span>

                                            <h3 className={`font-serif text-xl md:text-2xl mb-3 tracking-widest font-light ${format.accent}`}>
                                                {format.title}
                                            </h3>

                                            <div className="w-6 h-px bg-white/10 my-4" />

                                            <p className={`text-[10px] uppercase tracking-[0.15em] font-medium opacity-40 ${format.accent}`}>
                                                {format.subtitle}
                                            </p>
                                        </div>

                                        {/* Bottom Hint */}
                                        <div className="relative z-10 text-center pb-2">
                                            <span className={`text-[9px] font-bold tracking-[0.2em] uppercase opacity-30 ${format.accent} flex items-center justify-center gap-2 group-hover:opacity-50 transition-opacity`}>
                                                DETALLES
                                            </span>
                                        </div>
                                    </div>

                                    {/* --- BACK SIDE --- */}
                                    <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-sm p-8 flex flex-col justify-between overflow-hidden bg-white border border-stone-200`}>
                                        <div className="flex flex-col h-full text-center">
                                            <div className="flex items-center justify-center gap-2 mb-8 opacity-40">
                                                <Icon className="w-4 h-4 text-stone-900" strokeWidth={1} />
                                                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-500">
                                                    Especificaciones
                                                </span>
                                            </div>

                                            <div className="flex-1 flex flex-col items-center justify-center">
                                                <p className="text-sm leading-relaxed text-stone-600 mb-8 font-light tracking-wide px-2">
                                                    {format.backDescription}
                                                </p>

                                                <ul className="space-y-2 w-full max-w-[200px]">
                                                    {format.features.map((feature, i) => (
                                                        <li key={i} className="text-[10px] font-medium text-stone-900 uppercase tracking-widest border-b border-stone-100 pb-2 flex justify-center items-center gap-2">
                                                            <span className="w-1 h-1 bg-stone-300 rounded-full" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="mt-6 pt-4 text-center opacity-30">
                                                <span className="text-[8px] text-stone-900 uppercase tracking-[0.3em]">
                                                    Jimenez Nieto · 1952
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Global CSS for 3D Transform Utilities */}
            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .perspective-2000 { perspective: 2000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </section>
    );
}
