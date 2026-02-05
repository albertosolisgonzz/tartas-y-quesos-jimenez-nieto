'use client';

import { Utensils, Calendar, Users, Briefcase } from 'lucide-react';

const formats = [
    {
        weight: '70g',
        title: 'Eventos',
        description: 'Cátering y celebraciones',
        icon: Utensils,
    },
    {
        weight: '100g',
        title: 'Diario',
        description: 'Consumo individual',
        icon: Calendar,
    },
    {
        weight: '300g',
        title: 'Familiar',
        description: 'Para compartir en casa',
        icon: Users,
    },
    {
        weight: '1-2kg',
        title: 'Profesional',
        description: 'Hostelería y chefs',
        icon: Briefcase,
    }
];

export function FormatsSection() {
    return (
        <section className="py-16 bg-white border-y border-stone-100">
            <div className="container mx-auto px-4 md:px-6">
                {/* Minimal Header */}
                <div className="text-center mb-10">
                    <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-2">
                        Formatos Disponibles
                    </h2>
                    <p className="text-stone-500 text-sm">
                        Adaptados a cada necesidad
                    </p>
                </div>

                {/* Horizontal Format Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                    {formats.map((format, index) => {
                        const Icon = format.icon;
                        return (
                            <div
                                key={index}
                                className="group text-center p-6 rounded-lg hover:bg-stone-50 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-900 transition-colors duration-300">
                                    <Icon className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                </div>

                                {/* Weight Badge */}
                                <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-2">
                                    {format.weight}
                                </span>

                                {/* Title */}
                                <h3 className="font-serif text-lg text-stone-900 mb-1">
                                    {format.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-stone-500">
                                    {format.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
