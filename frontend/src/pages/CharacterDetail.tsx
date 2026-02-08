import { useParams, useNavigate } from 'react-router-dom';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { cn } from '../utils/cn';
import {
    Heart,
    Trash2,
    MessageSquare,
    Send,
    User,
    Loader2,
    ArrowLeft
} from 'lucide-react';

import { DetailField } from '../components/common/DetailField';

const CharacterDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        character,
        loading,
        error,
        isFavorite,
        characterComments,
        commentText,
        setCommentText,
        handleAddComment,
        handleDelete,
        toggleFavorite
    } = useCharacterDetail(id, {
        onDeleteSuccess: () => navigate('/')
    });

    if (!id) return (
        <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <User size={64} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">Select a character to view details</p>
        </div>
    );

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    if (error || !character) return (
        <div className="flex flex-col items-center justify-center h-full text-red-400">
            <p className="text-lg font-medium">Character not found</p>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            {/* Mobile Back Button */}
            <button
                onClick={() => navigate('/')}
                className="lg:hidden absolute top-6 left-6 p-2 text-primary hover:bg-primary-light rounded-full transition-all"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-6 mb-10 text-left">
                <div className="relative">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-20 h-20 rounded-full object-cover shadow-xl border-4 border-white"
                    />
                    <button
                        onClick={toggleFavorite}
                        className={cn(
                            "absolute bottom-0 right-0 p-1.5 rounded-full shadow-lg border-2 border-white transition-all",
                            isFavorite ? "bg-heart-active text-white scale-110" : "bg-white text-gray-300 hover:text-gray-400"
                        )}
                    >
                        <Heart size={14} fill={isFavorite ? "currentColor" : "none"} strokeWidth={isFavorite ? 0 : 3} />
                    </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{character.name}</h2>
            </div>

            {/* List Details */}
            <div className="mb-12">
                <DetailField label="Specie" value={character.species} />
                <DetailField label="Status" value={character.status} />
                <DetailField label="Gender" value={character.gender || 'None'} />
            </div>

            {/* Comments Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center">
                        <MessageSquare size={16} className="mr-2 text-primary" />
                        Comments
                    </h3>
                    <button
                        onClick={handleDelete}
                        className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center"
                    >
                        <Trash2 size={14} className="mr-1" />
                        Delete Character
                    </button>
                </div>

                <div className="space-y-4">
                    {characterComments.map((comment, idx) => (
                        <div key={idx} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-sm animate-in fade-in">
                            <p className="text-gray-600">{comment}</p>
                        </div>
                    ))}
                    {characterComments.length === 0 && (
                        <p className="text-center py-6 text-sm text-gray-400 italic">No comments yet</p>
                    )}
                </div>

                <form onSubmit={handleAddComment} className="relative mt-6">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full bg-gray-100 border border-transparent rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-30"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </section>
        </div>
    );
};

export default CharacterDetail;
