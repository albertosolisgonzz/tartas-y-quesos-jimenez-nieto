import Link from 'next/link';

const PROMOS = [
    {
        label: '3 porciones de tarta de queso a elegir × 9 €',
        href: '/product/pack-3-porciones-de-tarta',
    },
    {
        label: '3 cremas de queso a elegir × 9 €',
        href: '/product/pack-3-tarrinas-de-crema-100-gr',
    },
];

export function PromoBanner() {
    return (
        <div className="bg-stone-900 text-amber-50">
            <div className="container mx-auto px-4 h-9 flex items-center justify-start sm:justify-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 shrink-0">
                    Promo
                </span>
                {PROMOS.map((promo, index) => (
                    <span key={promo.href} className="flex items-center gap-4 sm:gap-5 shrink-0">
                        {index > 0 && (
                            <span className="text-amber-50/30" aria-hidden="true">|</span>
                        )}
                        <Link
                            href={promo.href}
                            className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] whitespace-nowrap underline-offset-4 hover:underline hover:text-white transition-colors"
                        >
                            {promo.label}
                        </Link>
                    </span>
                ))}
            </div>
        </div>
    );
}
