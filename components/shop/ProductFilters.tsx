'use client';

import { ChevronDown } from 'lucide-react';

export type ProductType = 'all' | 'cremas' | 'tartas' | 'quesos';
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

interface ProductFiltersProps {
    activeType: ProductType;
    sortBy: SortOption;
    onTypeChange: (type: ProductType) => void;
    onSortChange: (sort: SortOption) => void;
    productTypes?: { id: ProductType; label: string }[];
}

const DEFAULT_TYPES: { id: ProductType; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'cremas', label: 'Cremas' },
    { id: 'tartas', label: 'Tartas' },
    { id: 'quesos', label: 'Quesos' },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
    { id: 'default', label: 'Destacados' },
    { id: 'price-asc', label: 'Precio: menor a mayor' },
    { id: 'price-desc', label: 'Precio: mayor a menor' },
    { id: 'name-asc', label: 'Nombre A-Z' },
];

export function ProductFilters({
    activeType,
    sortBy,
    onTypeChange,
    onSortChange,
    productTypes = DEFAULT_TYPES,
}: ProductFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            {/* Type Filter Tabs - minimal underline style */}
            <div className="flex gap-6 border-b border-stone-200 w-full sm:w-auto overflow-x-auto no-scrollbar">
                {productTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => onTypeChange(type.id)}
                        className={`
                            pb-3 text-[11px] uppercase tracking-[0.15em] font-medium whitespace-nowrap
                            transition-all duration-300 relative
                            ${activeType === type.id
                                ? 'text-[#1A1412]'
                                : 'text-stone-400 hover:text-stone-600'
                            }
                        `}
                    >
                        {type.label}
                        <span
                            className={`absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300 ${activeType === type.id ? 'bg-[#1A1412]' : 'bg-transparent'
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* Sort Dropdown - minimal underline style */}
            <div className="relative mt-4 sm:mt-0">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="
                        appearance-none bg-transparent border-b border-stone-200 rounded-none
                        px-0 py-2 pr-6 text-[10px] uppercase tracking-[0.1em] text-stone-500 font-medium
                        cursor-pointer hover:border-stone-400 hover:text-[#1A1412]
                        focus:outline-none focus:border-[#1A1412] focus:text-[#1A1412]
                        transition-all duration-300
                    "
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>
        </div>
    );
}
