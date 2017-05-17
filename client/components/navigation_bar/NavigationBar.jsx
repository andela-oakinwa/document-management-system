import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class NavigationBar extends React.Component {
  /**
   * Renders to the DOM
   * @return {Object}
   */
  render() {
    return(
      <nav role="navigation">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">doqMan</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
      </nav>
    );
  }  
}

export default NavigationBar;
