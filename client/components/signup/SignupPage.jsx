import React from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import signupRequest from '../../actions/SignUpAction';
import validateInput from '../../../server/shared/ValidateInput';
/**
 * Component declared as a class since it's a root component 
 */
class SignUpPage extends React.Component {
  /**
   * Instance properties
   * @param  {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * Checks events triggered from the form
   * @param  {Object} event
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * Validates user inputs
   * @return {Boolean}
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * Forwards data to server
   * @param  {Object} event
   */
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
  /**
   * DOM rendering
   * @return {Object}
   */
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
