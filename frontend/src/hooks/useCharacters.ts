import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '../graphql/queries';
import { useAppContext } from '../context/AppContext';
import type { Character, CharacterFilters } from '../types';

export const useCharacters = (filters: CharacterFilters) => {
    const { favorites, deletedIds } = useAppContext();

    // Separate GraphQL filters from UI filters
    const gqlFilters = useMemo(() => ({
        name: filters.name,
        species: filters.species,
        gender: filters.gender
    }), [filters.name, filters.species, filters.gender]);

    const uiFilter = filters.status; // Repurposed as 'Starred' | 'Others' | undefined

    const { loading, error, data } = useQuery<{ characters: Character[] }, { filter: CharacterFilters }>(GET_CHARACTERS, {
        variables: { filter: gqlFilters },
    });

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

    return {
        loading,
        error,
        sections,
        totalCount: (sections.starred.length + sections.others.length)
    };
};
