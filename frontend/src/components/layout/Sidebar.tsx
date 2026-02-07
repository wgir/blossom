import { useState } from 'react';
import { Search, Loader2, SlidersVertical } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCharacters } from '../../hooks/useCharacters';
import type { CharacterFilters as FilterType } from '../../types';
import { cn } from '../../utils/cn';
import SearchDialog from '../search/SearchDialog';
import CharacterItem from '../character/CharacterItem';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterType>({ name: '', status: undefined, species: undefined, gender: undefined });

    const { loading, sections } = useCharacters(filters);

    const activeId = location.pathname.startsWith('/character/')
        ? parseInt(location.pathname.split('/').pop() || '0')
        : null;

    return (
        <>
            <div className={cn(
                "fixed inset-0 bg-black/5 transition-opacity lg:hidden z-40",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )} onClick={onClose} />

            <aside className={cn(
                "fixed inset-y-0 left-0 w-full lg:w-[280px] bg-bg-sidebar border-r border-gray-100 transform transition-transform duration-300 lg:relative lg:translate-x-0 z-50 flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 pb-4">
                    <div className="relative mb-6">
                        <div className="flex items-center bg-gray-100/80 rounded-2xl px-4 py-3 border border-transparent focus-within:border-primary-light focus-within:bg-white transition-all shadow-sm">
                            <Search className="text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search or filter results"
                                value={filters.name}
                                onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                                className="flex-1 bg-transparent ml-3 text-sm focus:outline-none text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal"
                            />
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={cn(
                                    "p-1.5 rounded-lg transition-colors ml-1",
                                    isFilterOpen ? "bg-primary text-white" : "text-gray-400 hover:text-gray-600"
                                )}
                            >
                                <SlidersVertical size={16} />
                            </button>
                        </div>
                        {isFilterOpen && (
                            <div className="absolute top-full left-0 right-0 z-10 mt-2">
                                <SearchDialog
                                    currentFilters={filters}
                                    onFilter={(f) => { setFilters(f); setIsFilterOpen(false); }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {loading && !sections.starred.length && !sections.others.length && (
                        <div className="flex justify-center py-10">
                            <Loader2 className="animate-spin text-gray-300" size={32} />
                        </div>
                    )}

                    {sections.starred.length > 0 && (
                        <div className="mb-6">
                            <h3 className="px-7 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4">
                                Starred Characters ({sections.starred.length})
                            </h3>
                            {sections.starred.map(c => (
                                <CharacterItem
                                    key={c.id}
                                    character={c}
                                    isActive={activeId === c.id}
                                    onClick={() => {
                                        navigate(`/character/${c.id}`);
                                        if (window.innerWidth < 1024) onClose();
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div>
                        <h3 className="px-7 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4">
                            Characters ({sections.others.length})
                        </h3>
                        {sections.others.map(c => (
                            <CharacterItem
                                key={c.id}
                                character={c}
                                isActive={activeId === c.id}
                                onClick={() => {
                                    navigate(`/character/${c.id}`);
                                    if (window.innerWidth < 1024) onClose();
                                }}
                            />
                        ))}
                        {!loading && sections.others.length === 0 && sections.starred.length === 0 && (
                            <p className="text-center text-xs text-gray-400 py-10">No characters found</p>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

