import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 * Handles client side user input validations
 * @type {Object}
 */
const ValidateInput = {
  /**
   * Handles user login input validation
   * @param  {Object} credentials Data containing login details
   * @return {Object}
   */
  checkLogin: (credentials) => {
    const errors = {};
    if (!validator.isEmail(credentials.email)) {
      errors.email = 'This field is required';
    }
    if (validator.isEmpty(credentials.password)) {
      errors.password = 'This field is required';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  /**
   * Handles user signup inputs validation
   * @param  {Object} credentials Data containing signup details
   * @return {Object}
   */
  checkSignup: (credentials) => {
    const errors = {};
    if (validator.isEmpty(credentials.firstName)) {
      errors.firstName = 'This field is required';
    }
    if (validator.isEmpty(credentials.lastName)) {
      errors.lastName = 'This field is required';
    }
    if (validator.isEmpty(credentials.username)) {
      errors.username = 'This field is required';
    }
    if (validator.isEmpty(credentials.email)) {
      errors.email = 'This field is required';
    }
    if (!validator.isEmail(credentials.email)) {
      errors.email = 'This field is required';
    }
    if (validator.isEmpty(credentials.password)) {
      errors.password = 'This field is required';
    }
    if (validator.isEmpty(credentials.passwordConfirmation)) {
      errors.passwordConfirmation = 'This field is required';
    }
    if (!validator.equals(credentials.password, credentials.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords must match';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
};

export default ValidateInput;
