import React from 'react';
import { Row, Input, Button } from 'react-materialize';

const SignUpForm = ({ onChange, userProps, onSubmit, errors }) => {
  return (
    <div className="container sign-up-form">
      <form className="col s12" onSubmit={onSubmit} method="post">
        <h5 className="center">Create Account</h5>
        <Row>
          {errors.form && <div style={{ color: '#f43636' }}>{errors.form}</div>}
          <Input
            label="First Name"
            s={6}
            validate
            errors={errors.firstName}
            value={userProps.firstname}
            onChange={onChange}
            type="text"
            name="firstname"
          />
          <Input
            label="Last Name"
            s={6}
            validate
            errors={errors.lastName}
            value={userProps.lastname}
            onChange={onChange}
            type="text"
            name="lastname"
          />
          <Input
            label="UserName"
            s={12}
            validate
            errors={errors.username}
            value={userProps.username}
            onChange={onChange}
            name="username"
          />
          <Input
            label="Email"
            s={12}
            validate
            errors={errors.email}
            value={userProps.email}
            onChange={onChange}
            type="email"
            name="email"
          />
          <Input
            label="Password"
            s={12}
            validate
            value={userProps.password}
            onChange={onChange}
            type="password"
            name="password"
          />
          <Input
            label="Re-type Password"
            s={12}
            validate
            value={userProps.passwordConfirmation}
            onChange={onChange}
            type="password"
            name="passwordConfirmation"
          />
          <Button
              type="submit"
              className="btn blue darken-4 waves-effect"
            >
              Sign Up
          </Button>
        </Row>
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  userProps: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired
};

export default SignUpForm;
