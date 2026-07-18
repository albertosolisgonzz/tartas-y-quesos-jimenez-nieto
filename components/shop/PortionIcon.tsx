/**
 * Ilustración minimalista de una rueda de queso (o tarta) con la porción
 * correspondiente rellena: entero, medio, cuarto u octavo. El contorno
 * discontinuo representa la rueda completa como referencia.
 */

export function portionFraction(variantTitle: string): number | null {
    const t = variantTitle.toLowerCase();
    if (t.includes('octavo')) return 1 / 8;
    if (t.includes('cuarto')) return 1 / 4;
    if (t.includes('medio')) return 1 / 2;
    if (t.includes('entero')) return 1;
    // Tartas: porción individual, 330 gr, 1 kg y 2 kg (entera)
    if (t.includes('porción') || t.includes('porcion')) return 1 / 8;
    if (t.includes('330')) return 1 / 4;
    if (t.replace(/\s/g, '').includes('1kg')) return 1 / 2;
    if (t.replace(/\s/g, '').includes('2kg')) return 1;
    return null;
}

export type FormatIllustration =
    | { kind: 'portion'; fraction: number }
    | { kind: 'tub'; size: 'sm' | 'lg' };

/**
 * Decide la ilustración según el producto y la variante:
 * - Cremas → tarrina pequeña (100 g) o grande (1 kg)
 * - Quesos y tartas → porción de rueda (octavo, cuarto, medio, entero)
 */
export function formatIllustration(productTitle: string, variantTitle: string): FormatIllustration | null {
    if (productTitle.toLowerCase().includes('crema')) {
        const t = variantTitle.toLowerCase().replace(/\s/g, '');
        if (t.includes('1000') || t.includes('1kg')) return { kind: 'tub', size: 'lg' };
        if (t.includes('100')) return { kind: 'tub', size: 'sm' };
        return null;
    }
    const fraction = portionFraction(variantTitle);
    return fraction !== null ? { kind: 'portion', fraction } : null;
}

interface PortionIconProps {
    fraction: number;
    className?: string;
}

interface TubIconProps {
    size: 'sm' | 'lg';
    className?: string;
}

/**
 * Tarrina de crema con tapa: grande (1 kg) o pequeña (100 g). La pequeña
 * lleva detrás el contorno punteado de la grande como referencia de tamaño.
 */
export function TubIcon({ size, className }: TubIconProps) {
    const lid = { x: 4, y: 5, width: 18, height: 3.6, rx: 1.6 };
    const body = 'M5.2 10.4 h15.6 l-1.5 12.6 h-12.6 z';

    if (size === 'lg') {
        return (
            <svg viewBox="0 0 26 26" className={className} aria-hidden="true">
                <rect {...lid} fill="currentColor" />
                <path d={body} fill="currentColor" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 26 26" className={className} aria-hidden="true">
            {/* Tarrina grande de referencia */}
            <g fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2.5" opacity="0.4">
                <rect {...lid} />
                <path d={body} />
            </g>
            {/* Tarrina pequeña */}
            <rect x="8.2" y="14" width="9.6" height="2.6" rx="1.2" fill="currentColor" />
            <path d="M9 17.4 h8 l-0.9 5.6 h-6.2 z" fill="currentColor" />
        </svg>
    );
}

export function PortionIcon({ fraction, className }: PortionIconProps) {
    const size = 26;
    const c = size / 2;
    const r = c - 1.5;

    if (fraction >= 1) {
        return (
            <svg viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
                <circle cx={c} cy={c} r={r} fill="currentColor" />
            </svg>
        );
    }

    const endAngle = ((-90 + 360 * fraction) * Math.PI) / 180;
    const x = c + r * Math.cos(endAngle);
    const y = c + r * Math.sin(endAngle);
    const largeArc = fraction > 0.5 ? 1 : 0;

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
            {/* Rueda completa de referencia */}
            <circle
                cx={c}
                cy={c}
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 2.5"
                opacity="0.4"
            />
            {/* Porción */}
            <path
                d={`M ${c} ${c} L ${c} ${c - r} A ${r} ${r} 0 ${largeArc} 1 ${x.toFixed(2)} ${y.toFixed(2)} Z`}
                fill="currentColor"
            />
        </svg>
    );
}
