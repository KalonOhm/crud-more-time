import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateBook from '../src/components/CreateBook';
import BookServices from '../src/services/BookServices';

// Mock the BookServices
jest.mock('../src/services/BookServices');

describe('CreateBook Component', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    genre: 'Test Genre'
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('Add Book Mode', () => {
    it('renders the add book form correctly', () => {
      // Arrange
      const props = {
        match: {
          params: {
            id: '_add'
          }
        },
        history: {
          push: jest.fn()
        }
      };

      // Act
      render(<CreateBook {...props} />);

      // Assert
      expect(screen.getByText('Add Book')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Author')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Genre')).toBeInTheDocument();
      expect(screen.getByText('Save changes')).toBeInTheDocument();
      expect(screen.getByText('Cancel changes')).toBeInTheDocument();
    });

    it('handles input changes', () => {
      // Arrange
      const props = {
        match: {
          params: {
            id: '_add'
          }
        },
        history: {
          push: jest.fn()
        }
      };

      // Act
      render(<CreateBook {...props} />);
      
      // Simulate user input
      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Book Title' } });
      fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'New Author' } });
      fireEvent.change(screen.getByPlaceholderText('Genre'), { target: { value: 'New Genre' } });

      // Assert
      expect(screen.getByPlaceholderText('Title').value).toBe('New Book Title');
      expect(screen.getByPlaceholderText('Author').value).toBe('New Author');
      expect(screen.getByPlaceholderText('Genre').value).toBe('New Genre');
    });

    it('saves a new book when form is submitted', async () => {
      // Arrange
      const props = {
        match: {
          params: {
            id: '_add'
          }
        },
        history: {
          push: jest.fn()
        }
      };
      
      BookServices.addBook.mockResolvedValue({});

      // Act
      render(<CreateBook {...props} />);
      
      // Fill in the form
      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Book Title' } });
      fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'New Author' } });
      fireEvent.change(screen.getByPlaceholderText('Genre'), { target: { value: 'New Genre' } });
      
      // Submit the form
      fireEvent.click(screen.getByText('Save changes'));

      // Assert
      await waitFor(() => {
        expect(BookServices.addBook).toHaveBeenCalledWith({
          title: 'New Book Title',
          author: 'New Author',
          genre: 'New Genre'
        });
        expect(props.history.push).toHaveBeenCalledWith('/books');
      });
    });

    it('navigates back to book list when cancel is clicked', () => {
      // Arrange
      const props = {
        match: {
          params: {
            id: '_add'
          }
        },
        history: {
          push: jest.fn()
        }
      };

      // Act
      render(<CreateBook {...props} />);
      
      // Click cancel button
      fireEvent.click(screen.getByText('Cancel changes'));

      // Assert
      expect(props.history.push).toHaveBeenCalledWith('/books');
    });
  });

  describe('Edit Book Mode', () => {
    it('loads book data and renders the edit form correctly', async () => {
      // Arrange
      const props = {
        match: {
          params: {
            id: '1'
          }
        },
        history: {
          push: jest.fn()
        }
      };
      
      BookServices.getBookById.mockResolvedValue({ data: mockBook });

      // Act
      render(<CreateBook {...props} />);

      // Assert
      expect(screen.getByText('Edit Book')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(BookServices.getBookById).toHaveBeenCalledWith('1');
        expect(screen.getByPlaceholderText('Title').value).toBe('Test Book');
        expect(screen.getByPlaceholderText('Author').value).toBe('Test Author');
        expect(screen.getByPlaceholderText('Genre').value).toBe('Test Genre');
      });
    });

    it('updates a book when edit form is submitted', async () => {
      // Arrange
      const props = {
        match: {
          params: {
            id: '1'
          }
        },
        history: {
          push: jest.fn()
        }
      };
      
      BookServices.getBookById.mockResolvedValue({ data: mockBook });
      BookServices.editBook.mockResolvedValue({});

      // Act
      render(<CreateBook {...props} />);
      
      // Wait for book data to load
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Title').value).toBe('Test Book');
      });
      
      // Change the form fields
      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Book Title' } });
      fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'Updated Author' } });
      
      // Submit the form
      fireEvent.click(screen.getByText('Save changes'));

      // Assert
      await waitFor(() => {
        expect(BookServices.editBook).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Updated Book Title',
            author: 'Updated Author',
            genre: 'Test Genre'
          }),
          '1'
        );
        expect(props.history.push).toHaveBeenCalledWith('/books');
      });
    });
  });

  it('handles error when loading book data', async () => {
    // Arrange
    const props = {
      match: {
        params: {
          id: '1'
        }
      },
      history: {
        push: jest.fn()
      }
    };
    
    // Mock an error response
    BookServices.getBookById.mockRejectedValue(new Error('Failed to fetch'));
    
    // Spy on console.error
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Act
    render(<CreateBook {...props} />);
    
    // Assert
    await waitFor(() => {
      expect(BookServices.getBookById).toHaveBeenCalledWith('1');
    });
    
    // Clean up
    console.error.mockRestore();
  });
});
