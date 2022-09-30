//imports

import React, { Component } from "react";
import BookServices from "../services/BookServices";

//constructor & superconstructor props, setting state of starting booklist,
class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };

    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }
  //filters the array, returns array with everything that *doesn't* match the book id we want to delete
  deleteBook(id) {
    BookServices.deleteBook(id).then((response) => {
      this.setState({
        books: this.state.books.filter((book) => book.id !== id),
      });
    });
  }
  //navigate to View Book page
  viewBook(id) {
    this.props.history.push(`/view-book/${id}`);
  }
  //navigate to update page
  editBook(id) {
    this.props.history.push(`/add-book/${id}`);
  }

  componentDidMount() {
    BookServices.getBooks().then((response) => {
      this.setState({ books: response.data });
    });
  }
  //navigates to add book page
  addBook() {
    this.props.history.push(`/add-book/_add`);
  }

  //render time
  render() {
    return (
      <>
        <h2 className="text-center">Reading List</h2>
        <div className="row">
          <button className="btn btn-info" onClick={this.addBook}>
            Add new recommendation
          </button>
        </div>
        <hr></hr>
        <div className="row">
          <table className="table table-striped table-bordered table-dark">
            <thead>
              <tr>
                <th> Book Title</th>
                <th> Book Author</th>
                <th> Book Genre</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.editBook(book.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteBook(book.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.viewBook(book.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default BookList;
