import Link from 'next/link';

const categories = [
    {
        id: 'quesos',
        title: 'Quesos Manchegos',
        description: 'Quesos de cabra y oveja con curación tradicional. Servidos en cuñas sin coste adicional.',
        image: '/images/collage-quesos.png',
        formats: ['70g', '100g', '300g', '1kg'],
        href: '/collections/quesos',
    },
    {
        id: 'cremas',
        title: 'Cremas Gourmet',
        description: 'Cremas de queso de cabra y oveja. Sabores exclusivos: trufa, salmón, anchoa.',
        image: '/images/collage-cremas.png',
        formats: ['70g', '100g', '300g'],
        href: '/collections/cremas',
    },
    {
        id: 'tartas',
        title: 'Tartas de Queso',
        description: 'Tartas de queso de cabra artesanales. Perfectas para eventos y celebraciones.',
        image: '/images/collage-tartas.png',
        formats: ['Individual', 'Familiar', 'Evento'],
        href: '/collections/tartas',
    },
    {
        id: 'eventos',
        title: 'Eventos',
        description: 'Mesas de quesos personalizadas, tartas nupciales y catering exclusivo.',
        image: '/images/collage-eventos.png',
        formats: ['Bodas', 'Fiestas', 'Catering'],
        href: '/contact',
    }
];

export function ProductCategoriesSection() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header - Left Aligned to match "Nuestros Productos" */}
                <div className="mb-8">
                    <span className="text-stone-400 text-xs font-medium tracking-widest uppercase mb-2 block">
                        Nuestra Producción
                    </span>
                    <h2 className="font-serif text-3xl md:text-3xl text-stone-900 mb-2">
                        Formatos para Cada Cliente
                    </h2>
                    <p className="text-stone-500 text-sm max-w-lg">
                        Elaboramos una gama completa de productos lácteos manchegos, disponibles en múltiples formatos.
                    </p>
                </div>

                {/* Grid - 4 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.href}
                            className="group block bg-[#F5F5F0] hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden"
                        >
                            {/* Image Collage on Top */}
                            <div className="relative aspect-square w-full overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${category.image})` }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                                    {category.title}
                                </h3>

                                <p className="text-stone-500 text-xs leading-relaxed mb-4 min-h-[3em]">
                                    {category.description}
                                </p>

                                {/* Formats pill style */}
                                <div className="flex flex-wrap gap-2">
                                    {category.formats.map((format) => (
                                        <span
                                            key={format}
                                            className="px-2 py-1 text-[10px] font-medium tracking-wider text-stone-500 bg-white/60 rounded"
                                        >
                                            {format}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
