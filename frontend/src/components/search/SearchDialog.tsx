import { useState } from 'react';
import type { CharacterListState, CharacterFilters } from '../../types';
import { cn } from '../../utils/cn';

interface SearchDialogProps {
    onFilter: (state: CharacterListState) => void;
    currentState: CharacterListState;
    onClose?: () => void;
}

const SearchDialog = ({ onFilter, currentState, onClose }: SearchDialogProps) => {
    const [tempState, setTempState] = useState<CharacterListState>(currentState);

    const subsections = [
        {
            title: 'Filter View',
            key: 'view',
            isViewState: true,
            options: [
                { label: 'All', value: 'All' },
                { label: 'Starred', value: 'Starred' },
                { label: 'Others', value: 'Others' }
            ]
        },
        {
            title: 'Specie',
            key: 'species',
            isViewState: false,
            options: [
                { label: 'All', value: undefined },
                { label: 'Human', value: 'Human' },
                { label: 'Alien', value: 'Alien' }
            ]
        },
        {
            title: 'Gender',
            key: 'gender',
            isViewState: false,
            options: [
                { label: 'All', value: undefined },
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' }
            ]
        }
    ];

    const handleApply = () => {
        onFilter(tempState);
        onClose?.();
    };

    const updateFilter = (key: string, value: string | undefined, isView: boolean) => {
        if (isView) {
            setTempState(prev => ({ ...prev, view: value as any }));
        } else {
            setTempState(prev => ({
                ...prev,
                filter: { ...prev.filter, [key]: value }
            }));
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl p-6 w-full animate-in fade-in slide-in-from-top-4 duration-300 max-h-[70vh] flex flex-col">
            <div className="space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {subsections.map(sub => (
                    <div key={sub.title}>
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">{sub.title}</p>
                        <div className="flex flex-wrap gap-2">
                            {sub.options.map(opt => {
                                const isSelected = sub.isViewState
                                    ? tempState.view === opt.value
                                    : tempState.filter[sub.key as keyof CharacterFilters] === opt.value;

                                return (
                                    <button
                                        key={opt.label}
                                        onClick={() => updateFilter(sub.key, opt.value, !!sub.isViewState)}
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

            <div className="mt-6">
                <button
                    onClick={handleApply}
                    className={cn(
                        "w-full font-bold py-4 rounded-2xl transition-all",
                        "bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90"
                    )}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default SearchDialog;
