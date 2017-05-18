import React from 'react';
import { connect } from 'react-redux';

class SignUpForm extends React.Component {
  // States and events decalred here
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(this.state);
  }
  // Renders object to the DOM
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Come aboard and enjoy the package</h1>
        <div>
          <label className="">Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text" 
            name="username" 
            className="" 
          />
        </div>

        <div>
          <label className="">Email</label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="text" 
            name="email" 
            className="" 
          />
        </div>

        <div>
          <label className="">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="text" 
            name="password" 
            className="" 
          />
        </div>

        <div>
          <label className="">Password Confirmation</label>
          <input
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="text" 
            name="passwordConfirmation" 
            className="" 
          />
        </div>
        <div>
          <button className="btn btn-large blue">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
