import React from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import signupRequest from '../../actions/SignUpAction';
import validateInput from '../../../server/shared/validateInput';

class SignUpPage extends React.Component {
  // States and events decalred here
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // Watches events triggered from the form
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  // Validates inputs
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  // Forwards data to server
  onSubmit(event) {
    event.preventDefault();
    if(this.isValid()) {
      this.setState({ errors: {} });
      this.props.signupRequest(this.state)
        .then(
          () => {
            this.context.router.push('/')
          },
          ({ data }) => {
            const errors = {};
            errors.form = data.message;
            this.setState({ errors });  
          });  
    }   
  }
  // Renders to the DOM
  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col s8 offset-s2">
          <SignUpForm 
            onChange={this.onChange}
            userProps={this.state}
            onSubmit={this.onSubmit}
            errors={errors}
          />
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  signupRequest: React.PropTypes.func.isRequired
};

SignUpPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { signupRequest })(SignUpPage);
