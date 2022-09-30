//imports
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookList from "./components/Booklist";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateBook from "./components/CreateBook";
import ViewBook from "./components/ViewBook";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container book-container">
          <Switch>
            <Route path="/" exact component={BookList}></Route>
            <Route path="/books" component={BookList}></Route>
            <Route path="/add-book/:id" component={CreateBook}></Route>
            <Route path="/view-book/:id" component={ViewBook}></Route>
            {/* <Route path = '/update-book/:id'  component = {BookList}></Route> */}
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
