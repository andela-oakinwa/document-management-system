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
        {}
        {isAthenticated && <DocumentsPage />}
      </div>
    );
  }
}

HomePage.propTypes = {
  athenticate: React.PropTypes.object.isRequired
};

const mapToProps = state => {athenticate: state.auth};

export default connect(mapToProps, null)(HomePage);
