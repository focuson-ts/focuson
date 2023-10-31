import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Nav } from "./Nav";




describe('Nav', () => {
    const mockFetch = jest.fn();
    const mockSetData = jest.fn();

    const defaultProps = {
        jsonFiles: ['file1.json', 'file2.json'],
        fetch: mockFetch,
        setData: mockSetData,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders jsonFiles as list items', () => {
        render(<Nav {...defaultProps} />);

        expect(screen.getByText('file1.json')).toBeDefined();
        expect(screen.getByText('file2.json')).toBeDefined();
    });

    it('fetches data and sets data when a file is clicked', async () => {
        mockFetch.mockResolvedValue('mocked data');

        render(<Nav {...defaultProps} />);

        const file1 = screen.getByText('file1.json');
        userEvent.click(file1);

        // Using "await" since the fetching process is asynchronous
        await screen.findByText('file1.json');

        expect(mockFetch).toHaveBeenCalledWith('file1.json');
        expect(mockSetData).toHaveBeenCalledWith('mocked data');
    });
});
