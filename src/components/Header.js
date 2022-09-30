//imports
import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
//header link takes you back to the reading list 
//instead of hitting the back button in browser, so you aren't stuck on View page
  render() {
    return (
      <>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
            <div><a className="navbar-brand " href="/">Reading List App</a></div>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
