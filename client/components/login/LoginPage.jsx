import React from 'react';
import { connect } from 'react-redux';
import validateInput from '../../../server/shared/ValidateInput';
import { login } from '../../actions/Authentication';
import LoginForm from './LoginForm';

/**
 * Class component defined as this is a root component
 */
class LoginPage extends React.Component {
  /**
   * Component properties
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * Checks client side input
   * @return {Boolean}
   */
  isValid() {
    const { errors, isValid } = ValidateInput.loginInput(this.state);
    if (!isValid) this.setState({ errors });
    return isValid;
  }
  /**
   * Handles submit event
   * @param {Object} event Event triggered
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.login(this.state)
        .then(
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
   * Handles change of state event as a result of user input
   * @param {Object} event Event triggered
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
  login: React.PropTypes.func.isRequired
};

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { login })(LoginPage);
