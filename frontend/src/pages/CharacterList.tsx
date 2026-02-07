import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '../graphql/queries';
import type { Character, CharacterFilters as FilterType } from '../types';
import CharacterCard from '../components/characters/CharacterCard';
import { useAppContext } from '../context/AppContext';
import { Search, Filter, Loader2, ArrowUpDown } from 'lucide-react';
import { cn } from '../utils/cn';
import SearchDialog from '../components/search/SearchDialog';

const CharacterList = () => {
    const { deletedIds } = useAppContext();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterType>({ name: '' });
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const { loading, error, data } = useQuery<{ characters: Character[] }, { filter: FilterType }>(GET_CHARACTERS, {
        variables: { filter: filters },
    });

    const characters = useMemo(() => {
        if (!data?.characters) return [];

        // Client-side filtering for soft delete
        let filtered = data.characters.filter((c: Character) => !deletedIds.includes(c.id));

        // Client-side sorting
        return [...filtered].sort((a: Character, b: Character) => {
            const comparison = a.name.localeCompare(b.name);
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [data, deletedIds, sortOrder]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Characters</h2>
                    <p className="text-gray-400 mt-1">Discover and manage your favorite characters</p>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative flex-1 md:w-80">
                        <input
                            type="text"
                            placeholder="Search or filter results"
                            value={filters.name}
                            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={cn(
                                "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors",
                                isFilterOpen ? "bg-primary text-white" : "text-gray-500 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Filter size={18} />
                        </button>
                        {isFilterOpen && (
                            <SearchDialog
                                currentFilters={filters}
                                onFilter={setFilters}
                                onClose={() => setIsFilterOpen(false)}
                            />
                        )}
                    </div>

                    <button
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="p-3 bg-[#1a1a1a] border border-white/5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all flex items-center space-x-2 group"
                        title={`Sort ${sortOrder === 'asc' ? 'Z-A' : 'A-Z'}`}
                    >
                        <ArrowUpDown size={20} className={cn("transition-transform duration-300", sortOrder === 'desc' && "rotate-180")} />
                        <span className="hidden sm:inline text-sm font-medium">{sortOrder === 'asc' ? 'A–Z' : 'Z–A'}</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <Loader2 className="animate-spin text-primary mb-4" size={48} />
                    <p className="text-gray-400">Loading characters...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
                    <p className="text-red-400 font-medium">Error loading characters. Please try again later.</p>
                </div>
            ) : characters.length === 0 ? (
                <div className="text-center py-20 bg-[#1a1a1a] rounded-3xl border border-dashed border-white/10">
                    <p className="text-gray-400 text-lg">No characters found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {characters.map((character: Character) => (
                        <CharacterCard key={character.id} character={character} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CharacterList;
