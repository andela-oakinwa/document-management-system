import React from 'react';
import { Link } from 'react-router';
/**
 * Class component. This is a root component
 */
class Footer extends React.Component {
  /**
   * Renders to the DOM
   * @param {String} url Link to twitter page
   * @return {Object}
   */
  render() {
    const url = 'https://twitter.com/Kaiser_Phemi';
    return (
      <footer className="page-footer blue darken-4">
        <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">doqMan DMS</h5>
                <p className="white-text">Create and store everything online.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Navigation</h5>
                <ul>
                  <li><Link className="white-text" to="/">Home</Link></li>
                  <li><Link className="white-text" to="/about">About</Link></li>
                  <li><Link className="white-text" to="#!">FAQ</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2017 Oluwafemi Akinwa
            <a className="white-text right" href={url} target="_blank">
              Follow on Twitter
            </a>
            </div>
          </div>
      </footer>
    );
  }
}

export default Footer;
