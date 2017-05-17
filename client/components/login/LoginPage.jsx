import React, { Component } from 'react';
import { connect } from 'react-redux';
import validateInput from '../../../server/middlewares/Authentication.login';
import { login } from '../../actions/Authentication';
import LoginForm from './LoginForm';

class LoginPage extends Component {
  /**
   * Constructor
   * @param  {Object} props 
   * @return {Object} 
   */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * Verifies user inputs
   * @return {Boolean} true or false
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) this.setState({ errors });
    return isValid;
  }
  /**
   * Handles submit event
   * @param  {Object} event
   * @return {Object} 
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.login(this.state).then(
        () => {
          this.context.router.push('/');
        },

        ({ data }) => {
          const errors = {};
          errors.form = data.message;
          this.setState({ errors });
        });
    }
  }
  /**
   * Checks for state change
   * @param  {Object} event 
   * @return {Object} 
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * Renders to the DOM
   * @return {Object}
   */
  render() {
    const { errors } = this.state;

    return (
      <div>
        <LoginForm
          errors={errors}
          onChange={this.onChange}
          loginProps={this.state}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired,
};

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginPage);
