import Link from 'next/link';

const categories = [
    {
        id: 'quesos',
        title: 'Quesos',
        description: 'Elaborados con leche cruda y curación tradicional.',
        formats: ['Cuña octavo 430g', 'Cuña cuarto 860g', 'Medio 1,7kg', 'Entero 3,4kg'],
        href: '/collections/quesos',
    },
    {
        id: 'cremas',
        title: 'Cremas Gourmet',
        description: 'De oveja y de cabra: suave, fuerte, con jamón, con romero, en aceite, con arándanos o con miel.',
        formats: ['100g', '1kg'],
        href: '/collections/cremas',
    },
    {
        id: 'tartas',
        title: 'Tartas de Queso',
        description: 'Clásica, Lotus, pistacho, Oreo, dulce de leche y Kinder.',
        formats: ['Individual', '330g', '1kg', '2kg'],
        href: '/collections/tartas',
    },
    {
        id: 'eventos',
        title: 'Eventos',
        description: 'Mesas personalizadas y catering exclusivo.',
        formats: ['Bodas', 'Fiestas', 'Catering'],
        href: '/contact',
    },
];

export function ProductCategoriesSection() {
    return (
        <section className="py-16 md:py-24 bg-[#FCFBF9]">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                {/* Header */}
                <div className="mb-10 md:mb-16 text-center">
                    <span className="text-amber-800/80 text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">
                        Nuestra Producción
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4 tracking-tight">
                        Formatos Disponibles
                    </h2>
                    <p className="text-stone-500 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
                        Seleccione su formato ideal para casa, hostelería o eventos especiales.
                    </p>
                </div>

                {/* Elegant rows */}
                <div className="flex flex-col border-t border-stone-200">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.href}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-stone-200 hover:bg-stone-50 transition-colors duration-300 px-4 md:px-6 -mx-4 md:mx-0"
                        >
                            {/* Title */}
                            <div className="flex flex-col md:w-1/3 mb-3 md:mb-0">
                                <h3 className="font-serif text-2xl md:text-3xl text-stone-900 group-hover:text-amber-800 transition-colors duration-300">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <div className="md:w-1/3 mb-4 md:mb-0">
                                <p className="text-stone-500 text-sm md:text-base font-light">
                                    {category.description}
                                </p>
                            </div>

                            {/* Formats + Arrow */}
                            <div className="md:w-1/3 flex flex-row items-center justify-between md:justify-end gap-6 text-sm">
                                <div className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end opacity-70">
                                    {category.formats.map((format) => (
                                        <span
                                            key={format}
                                            className="text-stone-600 text-xs tracking-wider uppercase font-medium"
                                        >
                                            {format}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-stone-300 group-hover:text-amber-700 transition-all duration-300 transform group-hover:translate-x-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
