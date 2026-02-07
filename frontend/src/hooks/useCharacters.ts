import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '../graphql/queries';
import { useAppContext } from '../context/AppContext';
import type { Character, CharacterFilters, CharacterListState } from '../types';

export const useCharacters = (state: CharacterListState) => {
    const { favorites, deletedIds } = useAppContext();

    // Memoize API filters to prevent unnecessary re-fetches
    const gqlFilters = useMemo(() => ({
        name: state.filter.name,
        species: state.filter.species,
        gender: state.filter.gender,
        status: state.filter.status
    }), [state.filter]);

    const { loading, error, data } = useQuery<{ characters: Character[] }, { filter: CharacterFilters }>(GET_CHARACTERS, {
        variables: { filter: gqlFilters },
        fetchPolicy: 'cache-and-network'
    });

    const sections = useMemo(() => {
        if (!data?.characters) return { starred: [], others: [] };

        // 1. Filter out deleted characters
        let all = data.characters.filter(c => !deletedIds.includes(c.id));

        // 2. Apply "View" filter (Starred vs Others)
        if (state.view === 'Starred') {
            all = all.filter(c => favorites.includes(c.id));
        } else if (state.view === 'Others') {
            all = all.filter(c => !favorites.includes(c.id));
        }

        // 3. Return categorized sections
        return {
            starred: all.filter(c => favorites.includes(c.id)),
            others: all.filter(c => !favorites.includes(c.id))
        };
    }, [data, favorites, deletedIds, state.view]);

    return {
        loading,
        error,
        sections,
        totalCount: (sections.starred.length + sections.others.length)
    };
};
