import React, { Component } from 'react';
import NavigationBar from './navigation_bar/NavigationBar';

class HomePage extends Component {
  render() {
    return(
      <NavigationBar />,
      <p>Welcome to my app</p>
    );
  }
}

export default HomePage;
