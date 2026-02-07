import { render, fireEvent } from '@testing-library/react';
import SearchDialog from './SearchDialog';
import type { CharacterListState } from '../../types';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('SearchDialog', () => {
    const mockState: CharacterListState = {
        filter: { name: '', species: undefined, gender: undefined },
        view: 'All'
    };
    const mockOnFilter = vi.fn();

    it('renders filter options and calls onFilter when Apply is clicked', () => {
        const { getByText } = render(
            <SearchDialog
                onFilter={mockOnFilter}
                currentState={mockState}
            />
        );

        expect(getByText('Filter View')).toBeInTheDocument();
        expect(getByText('Specie')).toBeInTheDocument();

        const humanButton = getByText('Human');
        fireEvent.click(humanButton);

        const applyButton = getByText('Apply Filters');
        fireEvent.click(applyButton);

        // Check that the function was called with the updated state
        expect(mockOnFilter).toHaveBeenCalledWith(
            expect.objectContaining({
                filter: expect.objectContaining({ species: 'Human' })
            })
        );
    });
});
