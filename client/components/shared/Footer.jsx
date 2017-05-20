import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {
  render() {
    return (
      <footer style={{backgroundColor: '#000033'}} className="page-footer">
        <div class="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">doqMan DMS</h5>
                <p className="white-text">Create and store everything online.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Navigation</h5>
                <ul>
                  <li><Link className="white-text" to="#!">Home</Link></li>
                  <li><Link className="white-text" to="#!">About</Link></li>
                  <li><Link className="white-text" to="#!">FAQ</Link></li>
                  <li><Link className="white-text" to="#!">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2017 Oluwafemi Akinwa
            <Link className="white-text right" to="#!">More Links</Link>
            </div>
          </div>
      </footer>
    ); 
  }
}

export default Footer;