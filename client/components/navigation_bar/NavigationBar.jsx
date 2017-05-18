import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class NavigationBar extends React.Component {
  render() {
    return(
      <header>
        <nav role="navigation" className="button-collapse blue">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo"><img src='../../assets/images/dms-logo.png' /></Link>
            <Link to="" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
            <ul id="mobile-menu" className="side-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }  
}

export default NavigationBar;
