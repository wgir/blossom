import { render, fireEvent } from '@testing-library/react';
import SearchDialog from './SearchDialog';
import type { CharacterFilters } from '../../types';
import { describe, it, expect, vi } from 'vitest';

describe('SearchDialog', () => {
    const mockFilters: CharacterFilters = { name: '', status: undefined, species: undefined };
    const mockOnFilter = vi.fn();

    it('renders filter options and calls onFilter when Apply is clicked', () => {
        const { getByText } = render(
            <SearchDialog
                onFilter={mockOnFilter}
                currentFilters={mockFilters}
            />
        );

        expect(getByText('Character')).toBeInTheDocument();
        expect(getByText('Specie')).toBeInTheDocument();

        const humanButton = getByText('Human');
        fireEvent.click(humanButton);

        const filterButton = getByText('Filter');
        fireEvent.click(filterButton);

        expect(mockOnFilter).toHaveBeenCalledWith(expect.objectContaining({ species: 'Human' }));
    });
});
