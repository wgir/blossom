import type { Character } from '../../types';
import { cn } from '../../utils/cn';
import { Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

interface CharacterCardProps {
    character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
    const { favorites, toggleFavorite } = useAppContext();
    const isFavorite = favorites.includes(character.id);

    return (
        <div className="group bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
            <Link to={`/character/${character.id}`} className="block relative aspect-square overflow-hidden">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(character.id);
                    }}
                    className={cn(
                        "absolute top-4 right-4 p-2.5 rounded-full transition-all backdrop-blur-md",
                        isFavorite
                            ? "bg-primary text-white scale-110 shadow-lg shadow-primary/40"
                            : "bg-black/20 text-white/70 hover:bg-black/40 hover:text-white hover:scale-105"
                    )}
                >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
            </Link>

            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                    <Link to={`/character/${character.id}`} className="text-lg font-bold hover:text-primary-light transition-colors line-clamp-1">
                        {character.name}
                    </Link>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className={cn(
                            "w-2 h-2 rounded-full",
                            character.status === 'Alive' ? "bg-green-500" : character.status === 'Dead' ? "bg-red-500" : "bg-gray-500"
                        )} />
                        <span className="text-sm text-gray-400">{character.species} • {character.status}</span>
                    </div>
                </div>

                <button
                    className="mt-auto w-full flex items-center justify-center space-x-2 bg-white/5 hover:bg-primary text-white py-2.5 rounded-xl transition-all border border-white/5 hover:border-primary group/btn"
                    onClick={() => toggleFavorite(character.id)}
                >
                    <Globe size={18} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                    <span className="text-sm font-medium">Add to Favorites</span>
                </button>
            </div>
        </div>
    );
};

export default CharacterCard;
