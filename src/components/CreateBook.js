//imports

import React, { Component } from "react";
import BookServices from "../services/BookServices";

class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //retrive bookId from route
      id: this.props.match.params.id,
      title: "",
      author: "",
      genre: "",
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
    this.saveBookChanges = this.saveBookChanges.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      BookServices.getBookById(this.state.id).then((response) => {
        let book = response.data;
        this.setState({
          title: book.title,
          author: book.author,
          genre: book.genre,
        });
      });
    }
  }

  saveBookChanges = (event) => {
    event.preventDefault();
    let book = {
      title: this.state.title,
      author: this.state.author,
      genre: this.state.genre,
    };
    console.log("book => " + JSON.stringify(book));

    if (this.state.id === "_add") {
      BookServices.addBook(book).then((response) => {
        this.props.history.push("/books");
      });
    } else {
      BookServices.editBook(book, this.state.id).then((response) => {
        this.props.history.push("/books");
      });
    }
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  changeAuthorHandler = (event) => {
    this.setState({ author: event.target.value });
  };

  changeGenreHandler = (event) => {
    this.setState({ genre: event.target.value });
  };

  cancel() {
    this.props.history.push("/books");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Book</h3>;
    } else {
      return <h3 className="text-center">Edit Book</h3>;
    }
  }

  //render time
  render() {
    return (
      <>
        <hr></hr>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Title </label>
                    <input
                      placeholder="Title"
                      name="title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.changeTitleHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Author </label>
                    <input
                      placeholder="Author"
                      name="author"
                      className="form-control"
                      value={this.state.author}
                      onChange={this.changeAuthorHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Genre </label>
                    <input
                      placeholder="Genre"
                      name="genre"
                      className="form-control"
                      value={this.state.genre}
                      onChange={this.changeGenreHandler}
                    />
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={this.saveBookChanges}
                  >
                    Save changes
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateBook;
