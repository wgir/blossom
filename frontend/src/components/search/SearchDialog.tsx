import { useState } from 'react';
import type { CharacterFilters as FilterType } from '../../types';
import { cn } from '../../utils/cn';

interface SearchDialogProps {
    onFilter: (filters: FilterType) => void;
    currentFilters: FilterType;
}

const SearchDialog = ({ onFilter, currentFilters }: SearchDialogProps) => {
    const [tempFilters, setTempFilters] = useState<FilterType>(currentFilters);

    const subsections = [
        {
            title: 'Character',
            key: 'status', // We are repurposing this for the UI selection if needed, 
            // or adding a new field. Let's keep it simple for the UI.
            options: [
                { label: 'All', value: undefined },
                { label: 'Starred', value: 'Starred' },
                { label: 'Others', value: 'Others' }
            ]
        },
        {
            title: 'Specie',
            key: 'species',
            options: [
                { label: 'All', value: undefined },
                { label: 'Human', value: 'Human' },
                { label: 'Alien', value: 'Alien' }
            ]
        }
    ];

    const handleApply = () => {
        onFilter(tempFilters);
    };

    const updateFilter = (key: keyof FilterType, value: string | undefined) => {
        setTempFilters(prev => ({ ...prev, [key]: value }));
    };

    const hasActiveFilters = !!(tempFilters.status || tempFilters.species || tempFilters.name);

    return (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl p-6 w-full animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="space-y-6">
                {subsections.map(sub => (
                    <div key={sub.title}>
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">{sub.title}</p>
                        <div className="flex flex-wrap gap-2">
                            {sub.options.map(opt => {
                                const isSelected = tempFilters[sub.key as keyof FilterType] === opt.value;
                                return (
                                    <button
                                        key={opt.label}
                                        onClick={() => updateFilter(sub.key as keyof FilterType, opt.value)}
                                        className={cn(
                                            "px-5 py-2 rounded-xl text-sm font-medium transition-all",
                                            isSelected
                                                ? "bg-primary-light text-primary ring-1 ring-primary/20"
                                                : "bg-white border border-gray-100 text-gray-600 hover:border-primary-light hover:text-primary"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleApply}
                className={cn(
                    "w-full mt-8 font-bold py-4 rounded-2xl transition-all",
                    hasActiveFilters
                        ? "bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90"
                        : "bg-gray-100 hover:bg-primary-light text-gray-400 hover:text-primary"
                )}
            >
                Filter
            </button>
        </div>
    );
};

export default SearchDialog;
