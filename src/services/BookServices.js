import axios from "axios";

const BOOK_API_BASE_URL = "https://633658bb8aa85b7c5d2b4189.mockapi.io/Book/";

class BookService {
  getBooks() {
    return axios.get(BOOK_API_BASE_URL);
  }

  addBook(book) {
    return axios.post(BOOK_API_BASE_URL, book);
  }

  getBookById(bookId) {
    return axios.get(`${BOOK_API_BASE_URL}${bookId}`);
  }

  editBook(book, bookId) {
    return axios.put(`${BOOK_API_BASE_URL}${bookId}`, book);
  }

  deleteBook(bookId) {
    return axios.delete(`${BOOK_API_BASE_URL}${bookId}`);
  }
}
export default new BookService();
