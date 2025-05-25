//imports
import React, { Component } from "react";
import BookServices from "../services/BookServices";
import StarRating from "./StarRating";

class ViewBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      book: {},
    };
  }

  componentDidMount() {
    BookServices.getBookById(this.state.id).then((response) => {
      this.setState({ book: response.data });
    });
  }

  render() {
    return (
      <>
        <hr></hr>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Book Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Book Title: </label>
              <div> {this.state.book.title}</div>
            </div>

            <div className="row">
              <label> Author Name: </label>
              <div> {this.state.book.author}</div>
            </div>

            <div className="row">
              <label> Genre: </label>
              <div> {this.state.book.genre}</div>
            </div>
            <StarRating />
          </div>
        </div>
      </>
    );
  }
}

export default ViewBook;
