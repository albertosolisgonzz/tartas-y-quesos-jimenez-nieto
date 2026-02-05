export function InnovationBanner() {
    return (
        <section className="py-12 bg-stone-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <span className="inline-block text-amber-400/80 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                        ✦ Innovación ✦
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-xl md:text-2xl text-white mb-4">
                        Colaboraciones con Productores Locales
                    </h3>

                    {/* Description */}
                    <p className="text-stone-400 text-sm mb-6 max-w-2xl mx-auto leading-relaxed">
                        Desarrollamos nuevas líneas de producto integrando ingredientes como chorizo,
                        cecina y otros para crear cremas de queso especiales con alto valor gastronómico.
                    </p>

                    {/* Flavor Tags */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Trufa', 'Salmón', 'Anchoa', 'Cecina', 'Chorizo'].map((flavor) => (
                            <span
                                key={flavor}
                                className="px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-stone-300 border border-stone-700 rounded-full"
                            >
                                {flavor}
                            </span>
                        ))}
                    </div>

                    {/* Tagline */}
                    <p className="text-stone-500 text-xs mt-6 italic">
                        Producto rentable, diferencial y fácil de vender.
                    </p>
                </div>
            </div>
        </section>
    );
}
