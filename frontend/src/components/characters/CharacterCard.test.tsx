import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing/react';
import CharacterCard from './CharacterCard';
import type { Character } from '../../types';
import { describe, it, expect, vi } from 'vitest';
import * as AppContextModule from '../../context/AppContext';

vi.mock('../../context/AppContext', () => ({
    useAppContext: () => ({
        favorites: [],
        toggleFavorite: vi.fn(),
    }),
}));

const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('CharacterCard', () => {
    it('renders character information', () => {
        const { getByText, getByAltText } = render(
            <MockedProvider>
                <BrowserRouter>
                    <CharacterCard character={mockCharacter} />
                </BrowserRouter>
            </MockedProvider>
        );

        expect(getByText('Rick Sanchez')).toBeInTheDocument();
        expect(getByText('Human • Alive')).toBeInTheDocument();
        expect(getByAltText('Rick Sanchez')).toBeInTheDocument();
    });
});
