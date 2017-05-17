import React, { Component } from 'react';
import { Button, Row, Input, Pagination } from 'react-materialize';

const ProfileForm = ({ userProps, onChange, onSubmit }) => {
  return (
    <div>
      <form className="col s12" method="post" onSubmit={onSubmit}>
        <h5 className="center" style={{ margin: 40 }}>Edit Profile</h5>
        <Row>
          <Input
            label="First Name"
            s={6}
            name="firstName"
            value={userProps.firstName}
            onChange={onChange}
            required
          />
          <Input
            label="Last Name"
            s={6}
            name="lastName"
            value={userProps.lastName}
            onChange={onChange}
            required
          />
          <Input
            label="Username"
            s={6}
            name="username"
            value={userProps.username}
            onChange={onChange}
            required
          />
          <Input
          label="Email"
            s={6}
            name="email"
            value={userProps.email}
            onChange={onChange}
            required
          />
          <Input
            label="Password"
            s={6}
            name="password"
            type="password"
            value={userProps.password}
            onChange={onChange}
            required
          />
        </Row>
        <Button waves="light" type="submit">
          UPDATE
        </Button>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  userProps: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default ProfileForm;
