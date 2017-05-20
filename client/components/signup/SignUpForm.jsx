import React from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

class SignUpForm extends React.Component {
  // States and events decalred here
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // watches evens triggered from the form
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  // Forwards data to server
  onSubmit(event) {
    event.preventDefault();
    this.props.signupRequest(this.state);
  }
  // Renders object to the DOM
  render() {
    return (
      <div className="container sign-up-form">
        <form className="col s12" onSubmit={this.onSubmit} method="post">
          <h5 className="center">Create Account</h5>
          <div className="row">
            <div className="input-field col s6">
              <label>First Name</label>
              <input
                value={this.state.firstname}
                onChange={this.onChange}
                type="text"
                name="firstname"
                className="validate"
              />  
            </div>
            <div className="input-field col s6">
              <label>Last Name</label>
              <input 
                value={this.state.lastname}
                onChange={this.onChange}
                type="text"
                name="lastname"
                class="validate" 
              />
            </div>
          </div>
          
          <div className="input-field">
            <label>Username</label>
            <input
              value={this.state.username}
              onChange={this.onChange}
              type="text" 
              name="username" 
              className="validate" 
            />
          </div>

          <div className="input-field">
            <label>Email</label>
            <input
              value={this.state.email}
              onChange={this.onChange}
              type="email" 
              name="email" 
              className="" 
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password" 
              name="password" 
              className="" 
            />
          </div>

          <div className="input-field">
            <label>Re-type Password</label>
            <input
              value={this.state.passwordConfirmation}
              onChange={this.onChange}
              type="password" 
              name="passwordConfirmation" 
              className="validate" 
            />
          </div>
          <div>
            <button className="btn blue">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  signupRequest: React.PropTypes.func.isRequired
}

export default SignUpForm;
