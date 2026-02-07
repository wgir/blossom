import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import CharacterList from './CharacterList';
import { GET_CHARACTERS } from '../graphql/queries';
import { describe, it, expect } from 'vitest';

const mocks = [
    {
        request: {
            query: GET_CHARACTERS,
            variables: { filter: { name: '' } },
        },
        result: {
            data: {
                characters: [
                    {
                        id: 1,
                        name: 'Rick Sanchez',
                        status: 'Alive',
                        species: 'Human',
                        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                    },
                ],
            },
        },
    },
];

describe('CharacterList', () => {
    it('renders loading state initially', async () => {
        render(
            <MockedProvider mocks={[]}>
                <AppProvider>
                    <BrowserRouter>
                        <CharacterList />
                    </BrowserRouter>
                </AppProvider>
            </MockedProvider>
        );
        await waitFor(() => {
            expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        });
    });

    it('renders characters after loading', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <AppProvider>
                    <BrowserRouter>
                        <CharacterList />
                    </BrowserRouter>
                </AppProvider>
            </MockedProvider>
        );

        const rick = await screen.findByText('Rick Sanchez');
        expect(rick).toBeInTheDocument();
    });
});
