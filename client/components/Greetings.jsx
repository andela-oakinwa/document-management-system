import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import NavigationBar from './navigation_bar/NavigationBar';

class HomePage extends Component {
  /**
   * Rednders to the DOM
   * @return {Object} 
   */
  render() {
    return(
      <div>
        {!isAuthenticated &&
          <div className="container" id="hero-text-container">
            <div className="row">
              <div className="col s12 center-align">
                <h3 id="hero-title" itemProp="description">
                  <span className="bold" >{'Welcome to DMS.    '}</span>
                  <span className="thin">
                  The simplest platform to manage your documents online</span>
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="center-align">
                  <Link className="btn btn-large create-list-link hero-btn" to="/signup">
                    Get Started
                  </Link>
                  <p>Already a user? <Link to="/login">Login</Link></p>
                </div>
              </div>
            </div>
          </div>}
        {isAuthenticated && <DocumentsPage />}
      </div>
    );
  }
}


export default connect(mapToProps, null)(HomePage);
