import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('Simple Test', () => {
    it('renders a simple element', () => {
        const { getByText } = render(
            <BrowserRouter>
                <div>Hello World</div>
            </BrowserRouter>
        );
        expect(getByText('Hello World')).toBeInTheDocument();
    });
});
