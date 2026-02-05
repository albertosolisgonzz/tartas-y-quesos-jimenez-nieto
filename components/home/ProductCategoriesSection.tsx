import Link from 'next/link';
import { Utensils, Calendar, Users, Briefcase } from 'lucide-react';

// Product categories with their available formats
const categories = [
    {
        id: 'quesos',
        title: 'Quesos',
        tagline: 'Artesanía manchega',
        description: 'Quesos de cabra y oveja con curación tradicional. Servidos en cuñas sin coste adicional.',
        formats: ['70g', '100g', '300g', '1kg'],
        href: '/collections/quesos',
    },
    {
        id: 'cremas',
        title: 'Cremas',
        tagline: 'Nueva línea gourmet',
        description: 'Cremas de queso de cabra y oveja. Sabores exclusivos: trufa, salmón, anchoa.',
        formats: ['70g', '100g', '300g'],
        href: '/collections/cremas',
    },
    {
        id: 'tartas',
        title: 'Tartas',
        tagline: 'Especialidad de la casa',
        description: 'Tartas de queso de cabra artesanales. Perfectas para eventos y celebraciones.',
        formats: ['Individual', 'Familiar', 'Evento'],
        href: '/collections/tartas',
    }
];

// Format sizing legend
const formatLegend = [
    { icon: Utensils, size: '70g', label: 'Eventos', description: 'Cátering y degustaciones' },
    { icon: Calendar, size: '100g', label: 'Diario', description: 'Consumo individual' },
    { icon: Users, size: '300g', label: 'Familiar', description: 'Para compartir' },
    { icon: Briefcase, size: '1kg+', label: 'Profesional', description: 'Hostelería' },
];

export function ProductCategoriesSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-stone-400 text-xs font-medium tracking-widest uppercase mb-3 block">
                        Nuestra Producción
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                        Formatos para Cada Cliente
                    </h2>

                    <p className="text-stone-500 text-sm max-w-lg mx-auto">
                        Elaboramos una gama completa de productos lácteos manchegos,
                        disponibles en múltiples formatos para cada necesidad.
                    </p>
                </div>

                {/* Product Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.href}
                            className="group block"
                        >
                            <div className="p-8 rounded-sm border border-stone-100 hover:border-stone-300 hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                                {/* Category Header */}
                                <div className="mb-6">
                                    <span className="text-[10px] font-medium tracking-widest uppercase text-stone-400 block mb-2">
                                        {category.tagline}
                                    </span>
                                    <h3 className="font-serif text-2xl text-stone-900 group-hover:text-stone-700 transition-colors">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">
                                    {category.description}
                                </p>

                                {/* Available Formats */}
                                <div className="pt-4 border-t border-stone-100">
                                    <span className="text-[9px] font-bold tracking-widest uppercase text-stone-300 block mb-3">
                                        Formatos
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {category.formats.map((format) => (
                                            <span
                                                key={format}
                                                className="px-2 py-1 text-[10px] font-medium tracking-wider text-stone-500 bg-stone-50 rounded"
                                            >
                                                {format}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Link Hint */}
                                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-stone-900 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span>Ver Colección</span>
                                    <span className="text-stone-400">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Format Legend - Compact */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 border-t border-stone-100">
                        {formatLegend.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.size} className="flex items-center gap-3 text-center md:text-left">
                                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-stone-500" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-stone-900">{item.size}</span>
                                        <span className="block text-[10px] text-stone-400">{item.description}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
