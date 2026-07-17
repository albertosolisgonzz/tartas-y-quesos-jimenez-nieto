import Image from 'next/image';

const FLAVORS = ['Trufa', 'Salmón', 'Anchoa', 'Cecina', 'Chorizo'];

export function InnovationBanner() {
    return (
        <section className="py-20 md:py-32 bg-[#FCFBF9] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
                        <span className="text-amber-800/80 text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
                            Innovación Constante
                        </span>

                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-6 tracking-tight leading-tight">
                            Colaboraciones y Nuevos Productos
                        </h2>

                        <div className="w-16 h-[1px] bg-amber-800/30 mx-auto lg:mx-0 mb-8"></div>

                        <p className="text-stone-500 text-base md:text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Desarrollamos nuevas líneas de producto integrando ingredientes como chorizo,
                            cecina y otros para crear cremas de queso especiales con alto valor gastronómico.
                        </p>

                        {/* Flavor Tags */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                            {FLAVORS.map((flavor) => (
                                <span
                                    key={flavor}
                                    className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-stone-600 border border-stone-200 rounded-sm bg-white hover:border-amber-800/30 hover:text-amber-800 transition-colors"
                                >
                                    {flavor}
                                </span>
                            ))}
                        </div>

                        <p className="text-stone-400 text-xs mt-10 font-serif italic tracking-wide">
                            Producto rentable, diferencial y fácil de vender.
                        </p>
                    </div>

                    {/* Collage Image */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="relative aspect-square w-full max-w-xl mx-auto rounded-sm overflow-hidden shadow-2xl">
                            <Image
                                src="/images/ingredients-collage.png"
                                alt="Ingredientes Gourmet: Trufa, Salmón, Anchoa, Cecina, Chorizo"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
