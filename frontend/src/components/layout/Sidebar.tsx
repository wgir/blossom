import { useState, useMemo } from 'react';
import { Search, X, Loader2, Heart, Filter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '../../graphql/queries';
import { useAppContext } from '../../context/AppContext';
import type { Character, CharacterFilters as FilterType } from '../../types';
import { cn } from '../../utils/cn';
import SearchDialog from '../search/SearchDialog';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { favorites, deletedIds, toggleFavorite } = useAppContext();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterType>({ name: '', status: undefined, species: undefined });

    // Separate GraphQL filters from UI filters
    const gqlFilters = useMemo(() => ({
        name: filters.name,
        species: filters.species
    }), [filters.name, filters.species]);

    const uiFilter = filters.status; // Repurposed as 'Starred' | 'Others' | undefined

    const { loading, data } = useQuery<{ characters: Character[] }, { filter: FilterType }>(GET_CHARACTERS, {
        variables: { filter: gqlFilters },
    });

    const activeId = location.pathname.startsWith('/character/')
        ? parseInt(location.pathname.split('/').pop() || '0')
        : null;

    const sections = useMemo(() => {
        if (!data?.characters) return { starred: [], others: [] };

        let all = data.characters.filter(c => !deletedIds.includes(c.id));

        // Apply local UI filtering
        if (uiFilter === 'Starred') {
            all = all.filter(c => favorites.includes(c.id));
        } else if (uiFilter === 'Others') {
            all = all.filter(c => !favorites.includes(c.id));
        }

        return {
            starred: all.filter(c => favorites.includes(c.id)),
            others: all.filter(c => !favorites.includes(c.id))
        };
    }, [data, favorites, deletedIds, uiFilter]);

    const CharacterItem = ({ character }: { character: Character }) => {
        const isActive = activeId === character.id;
        const isFavorite = favorites.includes(character.id);

        return (
            <div
                onClick={() => {
                    navigate(`/character/${character.id}`);
                    if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                    "group flex items-center p-3 mx-4 rounded-2xl cursor-pointer transition-all mb-2",
                    isActive
                        ? "bg-primary-light shadow-sm"
                        : "hover:bg-gray-50 bg-white"
                )}
            >
                <div className="relative">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className={cn(
                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                        character.status === 'Alive' ? "bg-green-500" : "bg-gray-400"
                    )} />
                </div>

                <div className="ml-3 flex-1 min-w-0">
                    <p className={cn(
                        "text-sm font-bold truncate transition-colors",
                        isActive ? "text-primary" : "text-gray-900"
                    )}>
                        {character.name}
                    </p>
                    <p className="text-xs text-secondary truncate">{character.species}</p>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(character.id);
                    }}
                    className={cn(
                        "p-1.5 transition-all text-gray-200 group-hover:block",
                        isFavorite ? "text-heart-active block" : "hidden"
                    )}
                >
                    <Heart size={18} fill={isFavorite ? "currentColor" : "none"} strokeWidth={isFavorite ? 0 : 2} className={isFavorite ? "text-heart-active" : "text-gray-300"} />
                </button>
            </div>
        );
    };

    return (
        <>
            <div className={cn(
                "fixed inset-0 bg-black/5 transition-opacity lg:hidden z-40",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )} onClick={onClose} />

            <aside className={cn(
                "fixed inset-y-0 left-0 w-[280px] bg-bg-sidebar border-r border-gray-100 transform transition-transform duration-300 lg:relative lg:translate-x-0 z-50 flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Rick and Morty list</h1>
                        <button onClick={onClose} className="lg:hidden p-2 text-gray-400">
                            <X size={24} />
                        </button>
                    </div>

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
                                <Filter size={16} />
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
                    {loading && !data && (
                        <div className="flex justify-center py-10">
                            <Loader2 className="animate-spin text-gray-300" size={32} />
                        </div>
                    )}

                    {sections.starred.length > 0 && (
                        <div className="mb-6">
                            <h3 className="px-7 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4">
                                Starred Characters ({sections.starred.length})
                            </h3>
                            {sections.starred.map(c => <CharacterItem key={c.id} character={c} />)}
                        </div>
                    )}

                    <div>
                        <h3 className="px-7 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4">
                            Characters ({sections.others.length})
                        </h3>
                        {sections.others.map(c => <CharacterItem key={c.id} character={c} />)}
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

