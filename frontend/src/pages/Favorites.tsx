import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '../graphql/queries';
import type { Character } from '../types';
import CharacterCard from '../components/characters/CharacterCard';
import { useAppContext } from '../context/AppContext';
import { Loader2, Star } from 'lucide-react';

const Favorites = () => {
    const { favorites } = useAppContext();
    const { loading, error, data } = useQuery<{ characters: Character[] }>(GET_CHARACTERS);

    const favoriteCharacters = data?.characters?.filter((c: Character) => favorites.includes(c.id)) || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-500/10 rounded-2xl">
                    <Star className="text-yellow-500" size={32} fill="currentColor" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">My Favorites</h2>
                    <p className="text-gray-400 mt-1">Characters you've starred</p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="animate-spin text-primary mb-4" size={48} />
                    <p className="text-gray-400">Loading your favorites...</p>
                </div>
            ) : favoriteCharacters.length === 0 ? (
                <div className="text-center py-20 bg-[#1a1a1a] rounded-3xl border border-dashed border-white/10">
                    <Star className="mx-auto text-gray-700 mb-4" size={64} />
                    <p className="text-gray-400 text-lg">You haven't added any favorites yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteCharacters.map((character: Character) => (
                        <CharacterCard key={character.id} character={character} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
