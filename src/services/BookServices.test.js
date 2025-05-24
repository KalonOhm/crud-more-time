import axios from 'axios';
import BookService from '../src/services/BookServices';

// Mock axios
jest.mock('axios');

describe('BookService', () => {
  const mockBookData = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    genre: 'Test Genre'
  };

  const mockBooksData = [
    mockBookData,
    {
      id: '2',
      title: 'Another Test Book',
      author: 'Another Test Author',
      genre: 'Another Test Genre'
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBooks', () => {
    it('should fetch all books successfully', async () => {
      // Arrange
      axios.get.mockResolvedValueOnce({ data: mockBooksData });
      
      // Act
      const result = await BookService.getBooks();
      
      // Assert
      expect(axios.get).toHaveBeenCalledWith('https://633658bb8aa85b7c5d2b4189.mockapi.io/Book/');
      expect(result.data).toEqual(mockBooksData);
    });

    it('should handle error when fetching books fails', async () => {
      // Arrange
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));
      
      // Act & Assert
      await expect(BookService.getBooks()).rejects.toThrow(errorMessage);
    });
  });

  describe('addBook', () => {
    it('should add a book successfully', async () => {
      // Arrange
      const newBook = {
        title: 'New Book',
        author: 'New Author',
        genre: 'New Genre'
      };
      axios.post.mockResolvedValueOnce({ data: { ...newBook, id: '3' } });
      
      // Act
      const result = await BookService.addBook(newBook);
      
      // Assert
      expect(axios.post).toHaveBeenCalledWith('https://633658bb8aa85b7c5d2b4189.mockapi.io/Book/', newBook);
      expect(result.data).toEqual({ ...newBook, id: '3' });
    });
  });

  describe('getBookById', () => {
    it('should fetch a book by id successfully', async () => {
      // Arrange
      axios.get.mockResolvedValueOnce({ data: mockBookData });
      
      // Act
      const result = await BookService.getBookById('1');
      
      // Assert
      expect(axios.get).toHaveBeenCalledWith('https://633658bb8aa85b7c5d2b4189.mockapi.io/Book/1');
      expect(result.data).toEqual(mockBookData);
    });
  });

  describe('editBook', () => {
    it('should update a book successfully', async () => {
      // Arrange
      const updatedBook = {
        title: 'Updated Title',
        author: 'Updated Author',
        genre: 'Updated Genre'
      };
      axios.put.mockResolvedValueOnce({ data: { ...updatedBook, id: '1' } });
      
      // Act
      const result = await BookService.editBook(updatedBook, '1');
      
      // Assert
      expect(axios.put).toHaveBeenCalledWith('https://633658bb8aa85b7c5d2b4189.mockapi.io/Book/1', updatedBook);
      expect(result.data).toEqual({ ...updatedBook, id: '1' });
    });
  });

  describe('deleteBook', () => {
    it('should delete a book successfully', async () => {
      // Arrange
      axios.delete.mockResolvedValueOnce({ data: mockBookData });
      
      // Act
      const result = await BookService.deleteBook('1');
      
      // Assert
      expect(axios.delete).toHaveBeenCalledWith('https://633658bb8aa85b7c5d2b4189.mockapi.io/Book/1');
      expect(result.data).toEqual(mockBookData);
    });
  });
});
