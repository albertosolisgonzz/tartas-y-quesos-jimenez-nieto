'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';

export function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsLoaded(true);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parallaxOffset = scrollY * 0.4;

    return (
        <section className="relative h-screen w-full overflow-hidden bg-stone-900 -mt-20">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 scale-110 transition-transform duration-100"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/hero-main.jpg')"
                    }}
                />
            </div>

            {/* Gradient Overlays - Clean and darker for better contrast without boxes */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
            <div className="absolute inset-0 bg-black/40" /> {/* Increased global darkness by ~20% */}

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-8 md:left-16 w-px h-32 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent" />
            <div className="absolute top-1/3 right-8 md:right-16 w-px h-24 bg-gradient-to-b from-transparent via-stone-400/30 to-transparent" />

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
                {/* Animated Badge */}
                <div
                    className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <span className="inline-block px-3 py-1 text-[9px] md:text-[11px] tracking-[0.3em] uppercase border border-white/30 text-white/90 rounded-full mb-4 md:mb-6 drop-shadow-md">
                        Porzuna, Ciudad Real
                    </span>
                </div>

                {/* Main Title with staggered animation */}
                <h1
                    className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 leading-[0.9] transition-all duration-1000 delay-500 drop-shadow-lg ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <span className="block text-white">Sabor</span>
                    <span className="block text-amber-100 italic">Artesanal</span>
                </h1>

                {/* Subtitle - Clean white text without box */}
                <div
                    className={`transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <p className="text-white/90 text-sm md:text-base max-w-lg mx-auto mb-8 font-light leading-relaxed drop-shadow-md">
                        Tres generaciones elaborando quesos y tartas con la pasión de siempre
                    </p>
                </div>

                {/* CTA Buttons */}
                <div
                    className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <Link
                        href="/collections/all"
                        className="group px-8 py-3 bg-white text-stone-900 text-xs uppercase tracking-widest font-bold hover:bg-amber-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        Ver Productos
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/about"
                        className="px-8 py-3 border border-white/40 text-white text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg"
                    >
                        Sobre Nosotros
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <span className="text-[10px] uppercase tracking-widest text-stone-300 drop-shadow-md">Explorar</span>
                <ChevronDown className="w-5 h-5 text-stone-300 animate-bounce drop-shadow-md" />
            </div>

            {/* Side Text (Desktop only) */}
            <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2">
                <span
                    className="text-[10px] uppercase tracking-[0.3em] text-stone-400 writing-mode-vertical drop-shadow-md"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                    Tradición Familiar
                </span>
            </div>
        </section>
    );
}
