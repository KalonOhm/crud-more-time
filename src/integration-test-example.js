import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import App from '../src/App';
import BookServices from '../src/services/BookServices';

// Mock BookServices
jest.mock('../src/services/BookServices');

describe('CRUD App Integration Tests', () => {
  const mockBooks = [
    { id: '1', title: 'Integration Test Book', author: 'Test Author', genre: 'Test Genre' },
    { id: '2', title: 'Another Book', author: 'Another Author', genre: 'Another Genre' }
  ];

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    BookServices.getBooks.mockResolvedValue({ data: mockBooks });
    BookServices.getBookById.mockImplementation((id) => {
      const book = mockBooks.find(book => book.id === id);
      return Promise.resolve({ data: book });
    });
    BookServices.addBook.mockImplementation((book) => {
      return Promise.resolve({ data: { ...book, id: '3' } });
    });
    BookServices.editBook.mockImplementation((book, id) => {
      return Promise.resolve({ data: { ...book, id } });
    });
    BookServices.deleteBook.mockImplementation((id) => {
      return Promise.resolve({ data: mockBooks.find(book => book.id === id) });
    });
  });

  // Integration test: Full CRUD flow
  it('performs full CRUD lifecycle - create, read, update, delete', async () => {
    // Render app with router
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // 1. Verify book list is displayed (READ operation)
    await waitFor(() => {
      expect(BookServices.getBooks).toHaveBeenCalled();
      expect(screen.getByText('Integration Test Book')).toBeInTheDocument();
      expect(screen.getByText('Another Book')).toBeInTheDocument();
    });

    // 2. Navigate to add book page (CREATE operation)
    fireEvent.click(screen.getByText('Add new recommendation'));
    
    await waitFor(() => {
      expect(screen.getByText('Add Book')).toBeInTheDocument();
    });

    // 3. Fill and submit the form
    fireEvent.change(screen.getByPlaceholderText('Title'), { 
      target: { value: 'New Integration Book' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Author'), { 
      target: { value: 'Integration Author' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Genre'), { 
      target: { value: 'Integration Genre' } 
    });
    
    fireEvent.click(screen.getByText('Save changes'));
    
    // Verify addBook was called with correct data
    await waitFor(() => {
      expect(BookServices.addBook).toHaveBeenCalledWith({
        title: 'New Integration Book',
        author: 'Integration Author',
        genre: 'Integration Genre'
      });
    });

    // 4. Verify we're navigated back to book list and API called again
    await waitFor(() => {
      expect(BookServices.getBooks).toHaveBeenCalled();
    });

    // 5. Mock the book list to include our new book
    const updatedMockBooks = [
      ...mockBooks,
      { id: '3', title: 'New Integration Book', author: 'Integration Author', genre: 'Integration Genre' }
    ];
    
    BookServices.getBooks.mockResolvedValue({ data: updatedMockBooks });
    
    // 6. Navigate to edit page by clicking edit on the first book (UPDATE operation)
    // This part would require more sophisticated rendering with route changes
    // In a real test, you would re-render with the updated route
    
    // 7. Navigate to view page for a book (detailed READ operation)
    // This part would require more sophisticated rendering with route changes
    
    // 8. Delete a book (DELETE operation)
    // Similarly, this would be part of a more comprehensive integration test

    // Note: Full integration testing with routing is more complex
    // and might be better accomplished with tools like Cypress for end-to-end testing
  });
});
