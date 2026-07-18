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

interface PortionIconProps {
    fraction: number;
    className?: string;
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
