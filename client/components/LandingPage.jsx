import React from 'react';
import { Link } from 'react-router';

class LandingPage extends React.Component {
  render() {
    return(
      <div>
        <div className="center white-text landing-page" style={{backgroundColor: '#000000'}}>
          <h4>Bring your office online</h4>
          <p>Create, share and manage all your business documents on the cloud</p>
          <div className="center">
              <Link className="btn btn-large create-list-link get-started-btn" to="/signup" style={{backgroundColor: '#496AE2'}}>
                Get Started
              </Link>
              <p>Already a user? <Link to="/login">Login</Link></p>
            </div>
        </div>
        <div className="center">
          <h5>Store Everything Online</h5>
          <p>Run your business more efficiently with your personalized workspace in the cloud. With everything stored in a centralized location, now you can conveniently share your files with your friends and colleagues.

          </p>
        </div>
    </div>
    );
  }
}

export default LandingPage;
