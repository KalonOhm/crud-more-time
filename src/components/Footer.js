//imports

import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
//footer links to personal profiles, could add link to personal site in future 
  render() {
    return (
      <>
        <footer className="footer text-center">
          <span className="text-muted">Kalon Ohmstede<a href="https://github.com/KalonOhm">  - GitHub -  </a><a href="https://www.linkedin.com/in/kalonohmstede/">LinkedIn</a></span>
        </footer>
      </>
    );
  }
}

export default Footer;
