import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {
  render() {
    return (
      <footer style={{backgroundColor: '#000033'}}>
        <div class="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">doqMan DMS</h5>
                <p className="grey-text text-lighten-4">Create and store everything online.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Navigation</h5>
                <ul>
                  <li><Link className="grey-text text-lighten-3" to="#!">Home</Link></li>
                  <li><Link className="grey-text text-lighten-3" to="#!">About</Link></li>
                  <li><Link className="grey-text text-lighten-3" to="#!">FAQ</Link></li>
                  <li><Link className="grey-text text-lighten-3" to="#!">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2014 Oluwafemi Akinwa
            <Link className="grey-text text-lighten-4 right" to="#!">More Links</Link>
            </div>
          </div>
      </footer>
    ); 
  }
}

export default Footer;