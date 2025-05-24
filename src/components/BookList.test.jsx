import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookList from '../src/components/Booklist';
import BookServices from '../src/services/BookServices';

// Mock the BookServices
jest.mock('../src/services/BookServices');

// Mock the history object used with react-router-dom
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('BookList Component', () => {
  const mockBooks = [
    { id: '1', title: 'Test Book 1', author: 'Author 1', genre: 'Fiction' },
    { id: '2', title: 'Test Book 2', author: 'Author 2', genre: 'Non-Fiction' }
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementation
    BookServices.getBooks.mockResolvedValue({ data: mockBooks });
  });

  it('renders book list correctly', async () => {
    // Arrange
    const props = {
      history: {
        push: jest.fn(),
      },
    };

    // Act
    render(<BookList {...props} />);

    // Assert
    // Wait for books to load
    await waitFor(() => {
      expect(BookServices.getBooks).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
      expect(screen.getByText('Test Book 2')).toBeInTheDocument();
      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
      expect(screen.getByText('Fiction')).toBeInTheDocument();
      expect(screen.getByText('Non-Fiction')).toBeInTheDocument();
    });
  });

  it('navigates to add book page when Add button is clicked', async () => {
    // Arrange
    const props = {
      history: {
        push: jest.fn(),
      },
    };

    // Act
    render(<BookList {...props} />);
    
    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('Add new recommendation')).toBeInTheDocument();
    });
    
    // Click the add button
    fireEvent.click(screen.getByText('Add new recommendation'));
    
    // Assert
    expect(props.history.push).toHaveBeenCalledWith('/add-book/_add');
  });

  it('navigates to edit book page when Edit button is clicked', async () => {
    // Arrange
    const props = {
      history: {
        push: jest.fn(),
      },
    };

    // Act
    render(<BookList {...props} />);
    
    // Wait for component to load
    await waitFor(() => {
      expect(screen.getAllByText('Edit')[0]).toBeInTheDocument();
    });
    
    // Click the edit button for the first book
    fireEvent.click(screen.getAllByText('Edit')[0]);
    
    // Assert
    expect(props.history.push).toHaveBeenCalledWith('/add-book/1');
  });

  it('deletes a book when Delete button is clicked', async () => {
    // Arrange
    const props = {
      history: {
        push: jest.fn(),
      },
    };
    
    // Mock the delete function
    BookServices.deleteBook.mockResolvedValue({});

    // Act
    render(<BookList {...props} />);
    
    // Wait for component to load
    await waitFor(() => {
      expect(screen.getAllByText('Delete')[0]).toBeInTheDocument();
    });
    
    // Click the delete button for the first book
    fireEvent.click(screen.getAllByText('Delete')[0]);
    
    // Assert
    await waitFor(() => {
      expect(BookServices.deleteBook).toHaveBeenCalledWith('1');
    });
  });

  it('navigates to view book page when View button is clicked', async () => {
    // Arrange
    const props = {
      history: {
        push: jest.fn(),
      },
    };

    // Act
    render(<BookList {...props} />);
    
    // Wait for component to load
    await waitFor(() => {
      expect(screen.getAllByText('View')[0]).toBeInTheDocument();
    });
    
    // Click the view button for the first book
    fireEvent.click(screen.getAllByText('View')[0]);
    
    // Assert
    expect(props.history.push).toHaveBeenCalledWith('/view-book/1');
  });

  it('handles error when fetching books', async () => {
    // Arrange
    const props = {
      history: {
        push: jest.fn(),
      },
    };
    
    // Mock an error response
    BookServices.getBooks.mockRejectedValue(new Error('Failed to fetch'));
    
    // Spy on console.error
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Act
    render(<BookList {...props} />);
    
    // Assert
    await waitFor(() => {
      expect(BookServices.getBooks).toHaveBeenCalledTimes(1);
    });
    
    // Clean up
    console.error.mockRestore();
  });
});
