import React, { Component } from 'react';

class NavigationBar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="Index.html" className="brand-logo"><img src="../src/assets/images/dms-logo.png"/></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="About.jsx">About</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </nav>  
    );
  }
}

export default NavigationBar;
