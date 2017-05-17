import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


class NavigationBar extends Component {
  /**
   * Handles logout event
   * @param  {Object} event
   * @return {void}      
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.context.router.push('/')
  }
  /**
   * Renders to the DOM
   * @return {Object}
   */
  render() {
    return (
      <nav className="" role="navigation">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">doqMan</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/">
                {isAuthenticated ? <span>Documents</span> : <span>Home</span>}
              </Link>
            </li>
            {user.roleId === 1
                && <li><Link id="users" to="/users"><span>Users</span></Link></li>}
            <li>
              {!isAuthenticated 
                && <Link to="/login" id="login">Login</Link>
              }
            </li>
              {isAuthenticated
                && <li><Link id="profile" to="editProfile">Profile</Link></li>
              }
            <li>
              {isAuthenticated 
                ? <Link to="/logout" onClick={this.logout.bind(this)}>Logout</Link>
                : <Link id="signup" to="/signup">Sign Up</Link>
              }
            </li>
          </ul>
        </div>
      </nav>  
    );
  }
}
/**
 * Component properties
 * @type {Object}
 */
NavigationBar.propTypes = {
  authenticate: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapToProps = state => {authenticate: state.auth};

export default connect(mapToProps, { logout })(NavigationBar);
