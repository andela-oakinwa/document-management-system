import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router';

const LoginForm = ({ errors, onChange, loginProps, onSubmit }) => {
  return (
    <form className="container col s12" onSubmit={onSubmit} method="post">
      <h5 className="center">Please login into your account</h5>
      <center>
        <Row className="container">
          {errors.form && <div style={{ color: '#f43636' }}>{errors.form}</div>}
          <div className="z-depth-1 grey lighten-4 row card-panel">
            <Input
              label="Enter your email"
              s={12}
              onChange={onChange}
              value={loginProps.email}
              name="email"
              id="email"
              className="validate"
            />
            <i className="small material-icons">email</i>
            <br />
            <br />
            <Input
              label="Enter your password"
              s={12}
              onChange={onChange}
              value={loginProps.password}
              name="password"
              type="password"
              id="password"
              className="validate"
            />
            <i className="small material-icons">lock</i>
            <div className="center">
              <Button
                type="submit"
                className="col s12 btn btn-large waves-effect"
                style={{ backgroundColor: '#496AE2' }}
              >
                Login
              </Button>
            </div>
          </div>
        </Row>
        <span className="signup-login-form__switch-copy">
          Don’t have an account?
        </span>
        <Link to="/signup"> Create Account</Link>
      </center>
    </form>
  );
};

LoginForm.propTypes = {
  errors: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loginProps: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default LoginForm;
