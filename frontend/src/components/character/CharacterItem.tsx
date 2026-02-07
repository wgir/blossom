import { Heart } from 'lucide-react';
import type { Character } from '../../types';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppContext';

interface CharacterItemProps {
    character: Character;
    isActive: boolean;
    onClick: () => void;
}

const CharacterItem = ({ character, isActive, onClick }: CharacterItemProps) => {
    const { favorites, toggleFavorite } = useAppContext();
    const isFavorite = favorites.includes(character.id);

    return (
        <div
            onClick={onClick}
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

export default CharacterItem;
