import React from 'react';
import { Button, Row, Input } from 'react-materialize';
/**
 * Functional stateless component
 * @return {Object}
 */
const ProfileForm = ({ userProps, onChange, onSubmit }) => {
  return (
    <div className="card-panel">
      <h4 className="header2">Edit Profile</h4>
        <div className="row">
          <form className="col s12" method="post" onSubmit={onSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input id="firstName" type="text"
                value={userProps.firstName}
                onChange={onChange}
                required />
                <label className="active" htmlFor="first_name">First Name</label>
              </div>      
              <div className="input-field col s6">
                <input id="lastName" type="text"
                value={userProps.lastName}
                onChange={onChange}
                required />
                <label className="active" htmlFor="last_name">Last Name</label>
              </div>
            </div>
             <div className="row">
              <div className="input-field col s6">
                <input id="username" type="text"
                value={userProps.username}
                onChange={onChange}
                required />
                <label className="active" htmlFor="username">Username</label>
                </div>
              <div className="input-field col s6">
                <input id="email" type="email"
                value={userProps.email}
                onChange={onChange}
                required />
                <label className="active" htmlFor="email">Email</label>
              </div>
            </div> 
            <button type="submit" onClick={onSubmit} className="btn btn-waves-effect">
            Update Account
            </button>
          </form>
        </div>
    </div>
  );
};

ProfileForm.propTypes = {
  userProps: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default ProfileForm;
