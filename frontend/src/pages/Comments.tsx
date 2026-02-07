import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '../graphql/queries';
import type { Character } from '../types';
import { useAppContext } from '../context/AppContext';
import { Loader2, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommentsPage = () => {
    const { comments } = useAppContext();
    const { loading, data } = useQuery<{ characters: Character[] }>(GET_CHARACTERS);

    const characterIdsWithComments = Object.keys(comments).filter(id => comments[parseInt(id)].length > 0);
    const charactersWithComments = data?.characters?.filter((c: Character) => characterIdsWithComments.includes(c.id.toString())) || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                    <MessageSquare className="text-blue-500" size={32} fill="currentColor" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">Characters with Comments</h2>
                    <p className="text-gray-400 mt-1">Review your thoughts on different characters</p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="animate-spin text-primary mb-4" size={48} />
                    <p className="text-gray-400">Loading comments...</p>
                </div>
            ) : charactersWithComments.length === 0 ? (
                <div className="text-center py-20 bg-[#1a1a1a] rounded-3xl border border-dashed border-white/10">
                    <MessageSquare className="mx-auto text-gray-700 mb-4" size={64} />
                    <p className="text-gray-400 text-lg">No comments found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {charactersWithComments.map((character: Character) => (
                        <div key={character.id} className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 hover:border-primary/30 transition-all flex flex-col">
                            <div className="flex items-center space-x-4 mb-6">
                                <img src={character.image} alt={character.name} className="w-16 h-16 rounded-2xl object-cover" />
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold">{character.name}</h3>
                                    <p className="text-gray-500 text-sm">{character.species}</p>
                                </div>
                                <Link
                                    to={`/character/${character.id}`}
                                    className="p-2 bg-white/5 rounded-xl hover:bg-primary text-gray-400 hover:text-white transition-all"
                                >
                                    <ExternalLink size={20} />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {comments[character.id].map((comment, idx) => (
                                    <div key={idx} className="bg-[#2a2a2a] p-3 rounded-xl border border-white/5 text-sm text-gray-300">
                                        {comment}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentsPage;
