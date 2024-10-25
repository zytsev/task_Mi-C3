import ErrorBoundary from './ErrorBoundary';
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';

describe('ErrorBoundary component', () => {
    const RandomError = () => {
        throw new Error('Random error!');
    };

    const realError = console.error;
    beforeEach(() => {
        console.error = vi.fn();
    });
    afterEach(() => {
        console.error = realError;
    });

    it('renders children when everything is fine', async () => {
        render(
            <ErrorBoundary>
                <p>Everything is fine</p>
            </ErrorBoundary>
        );
        expect(screen.getByText(/Everything is fine/i)).toBeInTheDocument();
    });

    it('shows an apologetic error message when an unhandled exception is thrown', () => {
        render(
            <ErrorBoundary>
                <RandomError />
                <p>Everything is fine</p>
            </ErrorBoundary>
        );

        expect(screen.queryByText(/Everything is fine/i)).not.toBeInTheDocument();
        expect(screen.getByText(/sorry/i)).toBeInTheDocument();
    });
});
