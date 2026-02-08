import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CharacterItem from './CharacterItem';
import type { Character } from '../../types';
import { useAppContext } from '../../context/AppContext';

// Define the mock function for toggleFavorite
const mockToggleFavorite = vi.fn();
const mockAddComment = vi.fn();

// Mock the AppContext module
vi.mock('../../context/AppContext', () => ({
    useAppContext: vi.fn()
}));

const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    // origin: { name: 'Earth', url: '' }, // Removed invalid properties based on types/index.ts
    // location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    // episode: [],
    // url: '',
    // created: '2017-11-04T18:48:46.250Z' 
    active: true // Added required property from types/index.ts
};

describe('CharacterItem', () => {
    const defaultProps = {
        character: mockCharacter,
        isActive: false,
        onClick: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        // Setup default mock return value
        vi.mocked(useAppContext).mockReturnValue({
            favorites: [],
            toggleFavorite: mockToggleFavorite,
            comments: {},
            addComment: mockAddComment
        });
    });

    it('renders character information correctly', () => {
        render(<CharacterItem {...defaultProps} />);

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Human')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
    });

    it('applies active styles when isActive is true', () => {
        const { container } = render(<CharacterItem {...defaultProps} isActive={true} />);

        // Check for specific class
        expect(container.firstChild).toHaveClass('bg-primary-light');
    });

    it('calls onClick when clicked', () => {
        render(<CharacterItem {...defaultProps} />);

        // Find the outer div or clicking the image container which bubbles up
        fireEvent.click(screen.getByText('Rick Sanchez').closest('div')!.parentElement!);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it('shows filled heart when character is favorite', () => {
        // Override mock for this test
        vi.mocked(useAppContext).mockReturnValue({
            favorites: [1],
            toggleFavorite: mockToggleFavorite,
            comments: {},
            addComment: mockAddComment
        });

        render(<CharacterItem {...defaultProps} />);

        const heartButton = screen.getByRole('button');
        // Check for specific class that indicates active state
        expect(heartButton).toHaveClass('text-heart-active');
    });

    it('calls toggleFavorite calls when heart is clicked', () => {
        // We set it as favorite so the button is visible and clickable
        // In the component, if checks: isFavorite ? "block" : "hidden" (unless group-hover)
        vi.mocked(useAppContext).mockReturnValue({
            favorites: [1],
            toggleFavorite: mockToggleFavorite,
            comments: {},
            addComment: mockAddComment
        });

        render(<CharacterItem {...defaultProps} />);

        const heartButton = screen.getByRole('button');
        fireEvent.click(heartButton);

        expect(mockToggleFavorite).toHaveBeenCalledWith(1);
        expect(defaultProps.onClick).not.toHaveBeenCalled();
    });
});
