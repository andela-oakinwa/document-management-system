import React, { Component } from 'react';
import NavigationBar from './navigation_bar/NavigationBar';
import FooterPage from './shared/FooterPage';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
        <FooterPage />
      </div>
    );
  }
}

export default App;
 