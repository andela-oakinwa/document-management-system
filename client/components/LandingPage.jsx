import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentsPage from './document/DocumentsPage';

class LandingPage extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
      {!isAuthenticated &&
        <div className="banner">
          <div className="landing-page" >
            <div className="row white-text">
              <div className="center-align">
                <h3>Welcome to doqMan</h3>
                <h4 className="thin">
                  <p>A platform to create, share and manage all your business documents online.
                  </p>
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="center-align">
                    <Link className="btn btn-large waves-effect get-started-btn teal darken-4" to="/signup">
                      Get Started
                    </Link>
                    <p className="white-text">
                      Already a user?
                      <Link to="/login">Login</Link>
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
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
};

export default connect(mapStateToProps, null)(LandingPage);
