import Link from 'next/link';

const categories = [
    {
        title: 'Quesos',
        description: 'Artesanos de cabra y oveja',
        features: ['Queso de cabra', 'Queso de oveja', 'Cuñas sin coste adicional'],
        href: '/collections/quesos',
        emoji: '🧀'
    },
    {
        title: 'Cremas',
        description: 'Nueva línea gourmet',
        features: ['Crema de cabra', 'Crema de oveja', 'Sabores premium'],
        href: '/collections/cremas',
        emoji: '🫕'
    },
    {
        title: 'Tartas',
        description: 'Especialidad artesanal',
        features: ['Queso de cabra', 'Eventos y celebraciones', 'Formatos personalizados'],
        href: '/collections/tartas',
        emoji: '🍰'
    }
];

export function WhatWeDoSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-stone-400 text-xs font-medium tracking-widest uppercase mb-2 block">
                        Qué Hacemos
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-3">
                        Productos Artesanos
                    </h2>
                    <p className="text-stone-500 text-sm max-w-md mx-auto">
                        Elaboramos una gama completa de productos lácteos pensados para diferentes usos
                    </p>
                </div>

                {/* Three Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group p-8 rounded-lg border border-stone-100 hover:border-stone-200 hover:shadow-lg transition-all duration-300 text-center"
                        >
                            {/* Emoji */}
                            <span className="text-4xl mb-4 block">{category.emoji}</span>

                            {/* Title */}
                            <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-700 transition-colors">
                                {category.title}
                            </h3>

                            {/* Description */}
                            <p className="text-stone-500 text-sm mb-4">
                                {category.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-1 text-xs text-stone-400">
                                {category.features.map((feature, i) => (
                                    <li key={i} className="flex items-center justify-center gap-1">
                                        <span className="w-1 h-1 bg-stone-300 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Link hint */}
                            <span className="inline-block mt-6 text-xs font-medium text-stone-900 uppercase tracking-wider border-b border-stone-900 pb-0.5 group-hover:border-stone-500 transition-colors">
                                Ver Colección
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
