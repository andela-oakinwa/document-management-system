import React, { Component } from 'react';
import NavigationBar from './shared/NavigationBar';
import FooterPage from './shared/FooterPage';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <main>{this.props.children}</main>
        <FooterPage />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default App;
