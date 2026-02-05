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
            {/* Type Filter Tabs */}
            <div className="flex gap-1 bg-stone-100 p-1 rounded-lg">
                {productTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => onTypeChange(type.id)}
                        className={`
                            px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-md
                            transition-all duration-200 ease-out
                            ${activeType === type.id
                                ? 'bg-white text-stone-900 shadow-sm'
                                : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
                            }
                        `}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="
                        appearance-none bg-white border border-stone-200 rounded-lg
                        px-4 py-2 pr-10 text-sm text-stone-700
                        cursor-pointer hover:border-stone-300
                        focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400
                        transition-all duration-200
                    "
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>
        </div>
    );
}
