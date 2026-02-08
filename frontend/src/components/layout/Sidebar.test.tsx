import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sidebar from './Sidebar';
import * as UseCharactersHook from '../../hooks/useCharacters';

// Mock react-router-dom
const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation(),
}));

// Mock CharacterItem to avoid AppContext dependency
vi.mock('../character/CharacterItem', () => ({
    default: ({ character, onClick }: any) => (
        <div onClick={onClick} data-testid={`character-${character.id}`}>
            {character.name}
        </div>
    )
}));

// Mock useCharacters hook
const mockUseCharacters = vi.spyOn(UseCharactersHook, 'useCharacters');

describe('Sidebar', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseLocation.mockReturnValue({ pathname: '/' });
    });

    it('renders loading state correctly', () => {
        mockUseCharacters.mockReturnValue({
            loading: true,
            error: undefined,
            sections: { starred: [], others: [] },
            totalCount: 0
        });

        render(<Sidebar {...defaultProps} />);
        expect(screen.queryByText('Starred Characters')).not.toBeInTheDocument();
        expect(screen.queryByText('Characters')).not.toBeInTheDocument();
    });

    it('renders list of characters when data is available', () => {
        mockUseCharacters.mockReturnValue({
            loading: false,
            error: undefined,
            sections: {
                starred: [],
                others: [
                    { id: 1, name: 'Rick', species: 'Human', image: 'rick.jpg', status: 'Alive' } as any,
                    { id: 2, name: 'Morty', species: 'Human', image: 'morty.jpg', status: 'Alive' } as any
                ]
            },
            totalCount: 2
        });

        render(<Sidebar {...defaultProps} />);

        expect(screen.getByText('Rick')).toBeInTheDocument();
        expect(screen.getByText('Morty')).toBeInTheDocument();
        expect(screen.getByText('Characters (2)')).toBeInTheDocument();
    });

    it('renders starred section when favorites exist', () => {
        mockUseCharacters.mockReturnValue({
            loading: false,
            error: undefined,
            sections: {
                starred: [
                    { id: 1, name: 'Rick', species: 'Human', image: 'rick.jpg', status: 'Alive' } as any
                ],
                others: []
            },
            totalCount: 1
        });

        render(<Sidebar {...defaultProps} />);

        expect(screen.getByText('Starred Characters (1)')).toBeInTheDocument();
        expect(screen.getByText('Rick')).toBeInTheDocument();
    });

    it('updates search filter when typing', () => {
        mockUseCharacters.mockReturnValue({
            loading: false,
            error: undefined,
            sections: { starred: [], others: [] },
            totalCount: 0
        });

        render(<Sidebar {...defaultProps} />);

        const input = screen.getByPlaceholderText('Search or filter results');
        fireEvent.change(input, { target: { value: 'Rick' } });

        expect(input).toHaveValue('Rick');
    });

    it('navigates to character detail when item clicked', () => {
        mockUseCharacters.mockReturnValue({
            loading: false,
            error: undefined,
            sections: {
                starred: [],
                others: [
                    { id: 1, name: 'Rick', species: 'Human', image: 'rick.jpg', status: 'Alive' } as any
                ]
            },
            totalCount: 1
        });

        render(<Sidebar {...defaultProps} />);

        fireEvent.click(screen.getByText('Rick'));
        expect(mockNavigate).toHaveBeenCalledWith('/character/1');
    });

    it('closes sidebar on item click when on mobile', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });

        mockUseCharacters.mockReturnValue({
            loading: false,
            error: undefined,
            sections: {
                starred: [],
                others: [
                    { id: 1, name: 'Rick', species: 'Human', image: 'rick.jpg', status: 'Alive' } as any
                ]
            },
            totalCount: 1
        });

        render(<Sidebar {...defaultProps} />);

        fireEvent.click(screen.getByText('Rick'));
        expect(defaultProps.onClose).toHaveBeenCalled();
    });
});
