import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_CHARACTER_DETAIL } from '../graphql/queries';
import { UPDATE_CHARACTER } from '../graphql/mutations';
import { useAppContext } from '../context/AppContext';
import type { Character } from '../types';

export const useCharacterDetail = (id: string | undefined, options?: { onDeleteSuccess?: () => void }) => {
    const { favorites, toggleFavorite, comments, addComment } = useAppContext();
    const [commentText, setCommentText] = useState('');

    const characterId = parseInt(id || '0');
    const { loading, error, data } = useQuery<{ character: Character }, { id: number }>(GET_CHARACTER_DETAIL, {
        variables: { id: characterId },
        skip: !characterId
    });

    const [updateCharacter] = useMutation(UPDATE_CHARACTER);

    const isFavorite = favorites.includes(characterId);
    const characterComments = comments[characterId] || [];

    const handleAddComment = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (commentText.trim()) {
            addComment(characterId, commentText.trim());
            setCommentText('');
        }
    };

    const handleDelete = async () => {
        if (confirm('Delete this character?')) {
            try {
                await updateCharacter({
                    variables: {
                        characterId: characterId,
                        status: false
                    },
                    update(cache) {
                        cache.modify({
                            id: cache.identify({ __typename: 'Character', id: characterId }),
                            fields: {
                                active() {
                                    return false;
                                }
                            }
                        });
                    }
                });
                if (options?.onDeleteSuccess) {
                    options.onDeleteSuccess();
                }
            } catch (err) {
                console.error('Failed to delete character:', err);
                alert('Failed to delete character');
            }
        }
    };

    return {
        character: data?.character,
        loading,
        error,
        isFavorite,
        characterComments,
        commentText,
        setCommentText,
        handleAddComment,
        handleDelete,
        toggleFavorite: () => toggleFavorite(characterId)
    };
};
