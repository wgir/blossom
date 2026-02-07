import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTER_DETAIL } from '../graphql/queries';
import { useAppContext } from '../context/AppContext';
import type { Character } from '../types';

export const useCharacterDetail = (id: string | undefined) => {
    const { favorites, toggleFavorite, comments, addComment, softDelete } = useAppContext();
    const [commentText, setCommentText] = useState('');

    const characterId = parseInt(id || '0');
    const { loading, error, data } = useQuery<{ character: Character }, { id: number }>(GET_CHARACTER_DETAIL, {
        variables: { id: characterId },
        skip: !characterId
    });

    const isFavorite = favorites.includes(characterId);
    const characterComments = comments[characterId] || [];

    const handleAddComment = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (commentText.trim()) {
            addComment(characterId, commentText.trim());
            setCommentText('');
        }
    };

    const handleDelete = () => {
        if (confirm('Delete this character?')) {
            softDelete(characterId);
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
