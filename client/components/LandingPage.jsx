import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import DocumentsPage from './document/DocumentsPage';
//import '../style/Index.scss';

class LandingPage extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth
    return(
      <div className="container">
      {!isAuthenticated &&
        <div>
          <div className="landing-page" >
            <div className="row">
              <div className="center-align">  
                <h3>Welcome to doqMan</h3>
                <h4 className="thin"><p>A platform to create, share and manage all your business documents online.</p>
                </h4>
              </div>
            </div>
            
            <div className="row">
              <div className="col s12">
                <div className="center-align">
                    <Link className="btn btn-large get-started-btn blue darken-4" to="/signup">
                      Get Started
                    </Link>
                    <p>Already a user? <Link to="/login">Login</Link></p>
                </div>
              </div>
            </div>
          </div>

          <div className="center-align short-message">
            <h5>Store Everything Online</h5>
            <p>Run your business more efficiently with your personalized workspace in the cloud. With everything stored in a centralized location, now you can conveniently share your files with your friends and colleagues.
            </p>
          </div>
        </div>}
      {isAuthenticated && <DocumentsPage />}
      </div>
    );
  }
}
LandingPage.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(LandingPage);
