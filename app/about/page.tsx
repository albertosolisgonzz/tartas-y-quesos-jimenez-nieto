import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Truck, Heart } from "lucide-react";

export const metadata = {
    title: "Sobre Nosotros | Tartas y Quesos Jiménez Nieto",
    description: "Descubre la historia de Tartas y Quesos Jiménez Nieto. Tres generaciones de tradición ganadera en Porzuna, Ciudad Real, elaborando quesos artesanos y tartas de queso únicas.",
};

export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center bg-stone-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559561853-08451507cbe7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
                    <span className="block text-sm tracking-[0.3em] uppercase mb-6 text-stone-300">
                        Nuestra Historia
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6">
                        Tres Generaciones de Pasión
                    </h1>
                    <p className="text-lg md:text-xl text-stone-200 font-light max-w-2xl mx-auto">
                        Desde Porzuna, Ciudad Real, llevamos el sabor de la tradición a tu mesa.
                    </p>
                </div>
            </section>

            {/* Origin Story */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4 block">
                                Nuestros Orígenes
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">
                                Una tradición familiar
                            </h2>
                            <div className="prose prose-stone prose-lg font-light text-stone-600 leading-relaxed space-y-6">
                                <p>
                                    <strong className="text-stone-900">Tartas y Quesos Jiménez Nieto</strong> nace en
                                    <strong className="text-stone-900"> Porzuna (Ciudad Real)</strong> como la evolución natural
                                    de una tradición familiar ligada al ganado y a la producción de leche.
                                </p>
                                <p>
                                    La historia comienza con el abuelo, continúa con el padre —que fue ampliando el rebaño— y,
                                    hace aproximadamente 12 años, <strong className="text-stone-900">Jesús David Jiménez Nieto</strong> toma
                                    el relevo adquiriendo el ganado y asumiendo el proyecto.
                                </p>
                                <p>
                                    Durante la pandemia, las dificultades en la recogida de leche impulsaron una decisión clave:
                                    transformar el producto para ganar independencia y asegurar el futuro del negocio.
                                    <em className="text-stone-700"> Ahí surge la idea de dar el salto a la elaboración propia.</em>
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[500px] bg-stone-100">
                            <Image
                                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1974&auto=format&fit=crop"
                                alt="Tradición quesera"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4 block">
                            Evolución
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-stone-900">
                            Nuestro Camino
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {[
                            { year: "2020-2021", title: "Los Primeros Pasos", description: "Inicio de la elaboración artesanal con quesos de cabra." },
                            { year: "2021-2022", title: "Cremas de Queso", description: "Incorporación de cremas de queso, ampliando la gama de productos." },
                            { year: "2022-2023", title: "Quesos de Oveja", description: "Entrada de quesos de oveja y cremas de oveja al catálogo." },
                            { year: "2023-Presente", title: "Tartas de Queso", description: "Última incorporación: tartas de queso de cabra, consolidando la identidad de la marca." },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-8 items-start">
                                <div className="w-32 shrink-0 text-right">
                                    <span className="text-sm font-bold text-stone-900">{item.year}</span>
                                </div>
                                <div className="w-px bg-stone-300 relative">
                                    <div className="absolute top-1 -left-1.5 w-3 h-3 rounded-full bg-stone-900"></div>
                                </div>
                                <div className="pb-8">
                                    <h3 className="font-serif text-xl text-stone-900 mb-2">{item.title}</h3>
                                    <p className="text-stone-600 font-light">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Overview */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4 block">
                            Qué Hacemos
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
                            Productos Artesanos
                        </h2>
                        <p className="text-stone-600 font-light max-w-2xl mx-auto">
                            Elaboramos una gama completa de productos lácteos artesanos pensados para diferentes usos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Quesos */}
                        <div className="group">
                            <div className="relative h-80 bg-stone-100 mb-6 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop"
                                    alt="Quesos artesanos"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-serif text-2xl text-stone-900 mb-3">Quesos</h3>
                            <ul className="text-stone-600 font-light space-y-2">
                                <li>• Quesos de cabra</li>
                                <li>• Quesos de oveja</li>
                                <li>• Servidos en cuñas sin coste adicional</li>
                            </ul>
                        </div>

                        {/* Cremas */}
                        <div className="group">
                            <div className="relative h-80 bg-stone-100 mb-6 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1628689469838-524a4a973b8e?q=80&w=2070&auto=format&fit=crop"
                                    alt="Cremas de queso"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-serif text-2xl text-stone-900 mb-3">Cremas de Queso</h3>
                            <ul className="text-stone-600 font-light space-y-2">
                                <li>• Cremas de cabra</li>
                                <li>• Cremas de oveja</li>
                                <li>• Nuevas líneas gourmet en desarrollo</li>
                            </ul>
                        </div>

                        {/* Tartas */}
                        <div className="group">
                            <div className="relative h-80 bg-stone-100 mb-6 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2070&auto=format&fit=crop"
                                    alt="Tartas de queso"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-serif text-2xl text-stone-900 mb-3">Tartas de Queso</h3>
                            <ul className="text-stone-600 font-light space-y-2">
                                <li>• Especialidad en queso de cabra</li>
                                <li>• Venta directa y eventos</li>
                                <li>• Formatos personalizados</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formats Section */}
            <section className="py-24 bg-stone-900 text-white">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4 block">
                            Flexibilidad
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">
                            Formatos para Cada Cliente
                        </h2>
                        <p className="text-stone-300 font-light max-w-2xl mx-auto">
                            Una de las ventajas clave de la marca es la adaptación total de formatos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { size: "70g", label: "Tapas", description: "Ideal para cátering, degustaciones y eventos" },
                            { size: "100g", label: "Diario", description: "El formato más vendido para el día a día" },
                            { size: "300g", label: "Familiar", description: "Perfecto para consumo doméstico" },
                            { size: "1-2kg", label: "Profesional", description: "Pensado para restauración y cátering" },
                        ].map((format, index) => (
                            <div key={index} className="text-center p-8 border border-stone-700 hover:border-stone-500 transition-colors">
                                <span className="font-serif text-4xl text-white">{format.size}</span>
                                <h4 className="font-bold text-sm uppercase tracking-widest mt-4 mb-2">{format.label}</h4>
                                <p className="text-stone-400 text-sm font-light">{format.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Innovation */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative h-[500px] bg-stone-100">
                            <Image
                                src="https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=2069&auto=format&fit=crop"
                                alt="Innovación gastronómica"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4 block">
                                Innovación
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">
                                Colaboraciones y Sabores Únicos
                            </h2>
                            <div className="prose prose-stone prose-lg font-light text-stone-600 leading-relaxed space-y-6">
                                <p>
                                    Trabajamos en nuevas líneas de producto basadas en colaboraciones con productores locales,
                                    integrando ingredientes como <strong className="text-stone-900">chorizo, cecina</strong> y otros
                                    para crear cremas de queso especiales con alto valor gastronómico.
                                </p>
                                <p>
                                    Además, desarrollamos sabores con perfil gourmet:
                                </p>
                                <ul className="list-none space-y-2 pl-0">
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-stone-900 rounded-full"></span>
                                        <span>Trufa</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-stone-900 rounded-full"></span>
                                        <span>Salmón</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-stone-900 rounded-full"></span>
                                        <span>Anchoa</span>
                                    </li>
                                </ul>
                                <p className="italic text-stone-500">
                                    Combinaciones pensadas para el mundo del aperitivo y la cocina, con un enfoque claro:
                                    producto rentable, diferencial y fácil de vender.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4 block">
                            Nuestra Filosofía
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-stone-900">
                            Valores que nos Definen
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Heart, title: "Tradición", description: "Tres generaciones de saber hacer" },
                            { icon: Award, title: "Calidad", description: "Ingredientes locales y procesos artesanos" },
                            { icon: Users, title: "Cercanía", description: "Adaptamos el formato a cada cliente" },
                            { icon: Truck, title: "Alcance", description: "Online, eventos, hostelería y particulares" },
                        ].map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-stone-300 rounded-full">
                                    <value.icon className="w-7 h-7 text-stone-700" />
                                </div>
                                <h3 className="font-serif text-xl text-stone-900 mb-2">{value.title}</h3>
                                <p className="text-stone-600 font-light">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-stone-900 text-white text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6">
                        ¿Listo para Probar?
                    </h2>
                    <p className="text-stone-300 font-light mb-10 text-lg">
                        Descubre nuestra selección de quesos artesanos y tartas de queso elaboradas con pasión.
                    </p>
                    <Link
                        href="/collections/all"
                        className="inline-flex items-center gap-2 bg-white text-stone-900 px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-stone-100 transition-colors"
                    >
                        Ver Productos <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
