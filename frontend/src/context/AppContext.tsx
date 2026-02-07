import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
    favorites: number[];
    toggleFavorite: (id: number) => void;
    comments: Record<number, string[]>;
    addComment: (id: number, comment: string) => void;
    deletedIds: number[];
    softDelete: (id: number) => void;

}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('blossom_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const [comments, setComments] = useState<Record<number, string[]>>(() => {
        const saved = localStorage.getItem('blossom_comments');
        return saved ? JSON.parse(saved) : {};
    });

    const [deletedIds, setDeletedIds] = useState<number[]>(() => {
        const saved = localStorage.getItem('blossom_deleted');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('blossom_favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('blossom_comments', JSON.stringify(comments));
    }, [comments]);

    useEffect(() => {
        localStorage.setItem('blossom_deleted', JSON.stringify(deletedIds));
    }, [deletedIds]);

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const addComment = (id: number, comment: string) => {
        setComments(prev => ({
            ...prev,
            [id]: [...(prev[id] || []), comment]
        }));
    };

    const softDelete = (id: number) => {
        setDeletedIds(prev => [...prev, id]);
    };



    return (
        <AppContext.Provider value={{
            favorites,
            toggleFavorite,
            comments,
            addComment,
            deletedIds,
            softDelete,

        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
};
