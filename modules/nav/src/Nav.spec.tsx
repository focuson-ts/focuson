//Copyright (c)2020-2023 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Nav } from "./Nav";

describe("Nav", () => {
    const mockJsonFiles = ['jsonFile1', 'jsonFile2'];
    const mockDataResponse = 'someResult';

    // Mock fetch function to return our mock data
    const mockFetch = jest.fn((url) => Promise.resolve(mockDataResponse));

    beforeEach(() => {
        // Clear all instances and calls to the mock function before each test
        mockFetch.mockClear();
    });

    it('renders the files passed to it', () => {
        const { getAllByRole } = render(<Nav jsonFiles={mockJsonFiles} setData={jest.fn()} fetch={mockFetch} />);
        const navItems = getAllByRole('listitem');

        // Check the number of rendered list items
        expect(navItems).toHaveLength(mockJsonFiles.length);

        // Check text content
        navItems.forEach((item, index) => {
            expect(item).toHaveTextContent(mockJsonFiles[index]);
        });
    });

    it('calls setData with fetched result on click', async () => {
        const mockSetData = jest.fn();
        const { getByText } = render(<Nav jsonFiles={mockJsonFiles} fetch={mockFetch} setData={mockSetData} />);

        const itemToClick = getByText(mockJsonFiles[0]);
        fireEvent.click(itemToClick);

        // Check if fetch was called with the correct URL
        expect(mockFetch).toHaveBeenCalledWith(mockJsonFiles[0]);

        // The fetch should resolve and call setData
        expect(mockSetData).toHaveBeenCalledWith(mockDataResponse);
    });
});
